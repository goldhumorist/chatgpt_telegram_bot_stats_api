import {
  IUsageActivityParams,
  TRange,
  TSearchDBResponseWithAggrUsageActivity,
} from '../../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';

export class UsageActivityRepo extends UserRequestToGPTLog {
  constructor() {
    super();
  }

  async getUsageActivityStatistic(
    data: IUsageActivityParams,
  ): Promise<TSearchDBResponseWithAggrUsageActivity> {
    const { searchFrom, searchTo, calendarInterval } = data;
    const requestDateField = this.schemaKeyValue.requestDate;

    const range: TRange<typeof requestDateField> = {
      [requestDateField]: {},
    };

    if (searchFrom) range[requestDateField].gte = searchFrom;
    if (searchTo) range[requestDateField].lte = searchTo;

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

    return response as unknown as TSearchDBResponseWithAggrUsageActivity;
  }
}

export const usageActivityRepo = new UsageActivityRepo();
