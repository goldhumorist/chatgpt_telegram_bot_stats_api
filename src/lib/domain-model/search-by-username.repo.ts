import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import {
  TSearchDBResponseWithSuggestions,
  ISearchByUsernameParams,
  TRange,
} from '../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';
import { DEFAULT_PAGE_SIZE } from '../constans';

export class SearchByUsernameRepo extends UserRequestToGPTLog {
  constructor() {
    super();
  }

  async searchByUserName(data: ISearchByUsernameParams) {
    const { username, page, limit, searchFrom, searchTo } = data;

    const usernameField = this.schemaKeyValue.userName;

    const size = limit ?? DEFAULT_PAGE_SIZE;
    const offset = size * page - size;

    const requestDateField = this.schemaKeyValue.requestDate;
    const range: TRange<typeof requestDateField> = {
      [requestDateField]: {},
    };

    if (searchFrom) range[requestDateField].gte = searchFrom;
    if (searchTo) range[requestDateField].lte = searchTo;

    const searchQuery: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            match: {
              [usernameField]: {
                query: `${username}`,
                operator: 'and',
                fuzziness: 'auto',
              },
            },
          },
        ],
        filter: [{ range }],
      },
    };

    const searchResponse = await this._client.search({
      index: this.USER_REQUEST_INDEX,
      from: offset,
      size,
      query: searchQuery,
    });

    return searchResponse as any as TSearchDBResponseWithSuggestions;
  }
}

export const searchByUsernameRepo = new SearchByUsernameRepo();
