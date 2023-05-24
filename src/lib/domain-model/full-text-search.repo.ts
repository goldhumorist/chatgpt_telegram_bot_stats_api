import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { SearchSuggester } from '@elastic/elasticsearch/lib/api/types';
import {
  IFullTextSearchDBResponse,
  IFullTextSearchParams,
  TRange,
} from '../interfaces';
import { UserRequestToGPTLog } from './user-request-gpt-log';
import { DEFAULT_PAGE_SIZE } from '../constans';

export class FullTextSearchRepo extends UserRequestToGPTLog {
  constructor() {
    super();
  }

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

        filter: [{ range }],
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
