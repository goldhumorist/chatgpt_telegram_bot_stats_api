import { loggerFactory } from '../../../global-helpers/logger.helper';
import {
  IUniqueUsersAggregation,
  IUsersActivityParams,
  TRange,
  TSearchDBResponseWithAggrUserActivity,
} from '../../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';

const logger = loggerFactory.getLogger(__filename);

export class UsersActivityRepo extends UserRequestToGPTLog {
  constructor() {
    super();
  }

  async getUsersActivityStatistic(data: IUsersActivityParams) {
    const usernameField = this.schemaKeyValue.userName;

    const { searchFrom, searchTo } = data;

    const numberOfUniqueUsers = (
      (
        await this._client.search({
          index: this.USER_REQUEST_INDEX,
          size: 0,
          aggs: {
            uniqueUsers: {
              cardinality: {
                field: usernameField,
              },
            },
          },
        })
      )?.aggregations?.uniqueUsers as IUniqueUsersAggregation
    )?.value;

    const requestDateField = this.schemaKeyValue.requestDate;

    const range: TRange<typeof requestDateField> = {
      [requestDateField]: {},
    };

    if (searchFrom) range[requestDateField].gte = searchFrom;
    if (!searchFrom) {
      const currentDate = new Date();
      const oneMonthAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
      );
      range[requestDateField].gte = oneMonthAgo as any as string;
    }
    if (searchTo) range[requestDateField].lte = searchTo;

    const response = await this._client.search({
      index: this.USER_REQUEST_INDEX,
      size: 0,
      query: {
        bool: {
          must: [{ range }],
        },
      },
      aggregations: {
        usersActivity: {
          terms: {
            field: usernameField,
            size: numberOfUniqueUsers,
          },
        },
      },
    });

    logger.info('Response from DB', response);

    return response as any as TSearchDBResponseWithAggrUserActivity;
  }
}

export const usersActivityRepo = new UsersActivityRepo();
