import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { SearchSuggester } from '@elastic/elasticsearch/lib/api/types';
import {
  IFullTextSearchDBResponse,
  IFullTextSearchParams,
} from '../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';

export class FullTextSearchRepo extends UserRequestToGPTLog {
  //
  async fullTextSearchInUserRequestLog(
    data: IFullTextSearchParams,
  ): Promise<IFullTextSearchDBResponse> {
    const {
      phraseToSearch,
      searchIn: fieldForSearch,
      page,
      limit,
      searchFrom,
      searchTo,
    } = data;

    const size = limit ?? 20;
    const offset = size * page - size;

    const range: { requestDate: { gte?: string; lte?: string } } = {
      requestDate: {},
    };
    if (searchFrom) range.requestDate.gte = searchFrom;
    if (searchTo) range.requestDate.lte = searchTo;

    const searchQuery: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            bool: {
              should: [
                {
                  match: {
                    [fieldForSearch]: {
                      query: `${phraseToSearch}`,
                      operator: 'or',
                      fuzziness: 'auto',
                    },
                  },
                },
                {
                  wildcard: {
                    [fieldForSearch]: {
                      value: `*${phraseToSearch}*`,
                      boost: 1.0,
                      rewrite: 'constant_score',
                    },
                  },
                },
              ],
            },
          },
          {
            range,
          },
        ],
      },
    };

    const suggestQuery: SearchSuggester = {
      text: `${phraseToSearch}`,
      simple_phrase: {
        phrase: {
          field: `${fieldForSearch}`,
          size: 2,
          gram_size: 2,
          direct_generator: [
            {
              field: `${fieldForSearch}`,
              suggest_mode: 'always',
            },
          ],
          highlight: {
            pre_tag: '<em>',
            post_tag: '</em>',
          },
        },
      },
    };

    const searchResponse = await this._client.search({
      index: this.USER_REQUEST_INDEX,
      from: offset,
      size,
      query: searchQuery,
      suggest: suggestQuery,
    });

    return searchResponse as unknown as IFullTextSearchDBResponse;
  }
}

export const fullTextSearchRepo = new FullTextSearchRepo();
