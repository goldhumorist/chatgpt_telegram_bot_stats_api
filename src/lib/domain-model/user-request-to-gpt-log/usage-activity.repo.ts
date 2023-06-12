import { loggerFactory } from '../../../global-helpers/logger.helper';
import {
  IUsageActivityParams,
  TSearchDBResponseWithAggrUsageActivity,
} from '../../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';

const logger = loggerFactory.getLogger(__filename);

export class UsageActivityRepo extends UserRequestToGPTLog {
  constructor() {
    super();
  }

  async getUsageActivityStatistic(
    data: IUsageActivityParams,
  ): Promise<TSearchDBResponseWithAggrUsageActivity> {
    const { searchFrom, searchTo, calendarInterval } = data;
    const requestDateField = this.schemaKeyValue.requestDate;

    const range = {
      [requestDateField]: {
        gte: searchFrom,
        lte: searchTo,
      },
    };

    const response = await this._client.search({
      index: this.USER_REQUEST_INDEX,
      size: 0,
      query: {
        bool: {
          filter: [{ range }],
        },
      },
      aggregations: {
        usageActivity: {
          date_histogram: {
            field: `${requestDateField}`,
            calendar_interval: `${calendarInterval}`,
          },
        },
      },
    });

    logger.info('Response from DB', response);

    return response as unknown as TSearchDBResponseWithAggrUsageActivity;
  }
}

export const usageActivityRepo = new UsageActivityRepo();
