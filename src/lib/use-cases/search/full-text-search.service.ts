import validator from 'validator';
import { loggerFactory } from '../../../global-helpers/logger.helper';
import { UserRequestToGPTLog } from '../../domain-model/index';
import {
  TFullTextSearchResponseDump,
  IFullTextSearchParams,
  IFullTextSearchResponse,
  TSearchDBResponseWithSuggestions,
} from '../../interfaces';
import UseCaseBase from '../base.service';

const logger = loggerFactory.getLogger(__filename);

const { FullTextSearchRepo } = UserRequestToGPTLog;

export default class FullTextSearchService extends UseCaseBase<
  IFullTextSearchParams,
  IFullTextSearchResponse
> {
  static validationRules: IFullTextSearchParams = {
    phraseToSearch: ['required', { min_length: 2 }],
    searchIn: ['required', { one_of: ['question', 'response'] }],
    page: ['required', 'positive_integer', { min_number: 1 }],
    limit: ['positive_integer', { min_number: 1 }],
    searchFrom: 'iso_date',
    searchTo: 'iso_date',
  } as unknown as IFullTextSearchParams;

  async sanitize(data: IFullTextSearchParams): Promise<IFullTextSearchParams> {
    return {
      ...data,
      phraseToSearch: validator.blacklist(data.phraseToSearch || '', '*'),
    };
  }

  async execute(data: IFullTextSearchParams) {
    const response = await FullTextSearchRepo.fullTextSearchInUserRequestLog(
      data,
    );

    const dumpedResponse = this.dumpResponse(response);

    logger.info('Dumped response', dumpedResponse);

    return { data: dumpedResponse };
  }

  dumpResponse(
    data: TSearchDBResponseWithSuggestions,
  ): TFullTextSearchResponseDump {
    const { hits } = data.hits;
    const suggestions = data.suggest?.simple_phrase[0]?.options;

    const dumpedResult: TFullTextSearchResponseDump = {
      total: {
        value: data.hits.total.value,
        relation: data.hits.total.relation,
      },
      hits:
        // eslint-disable-next-line @typescript-eslint/typedef
        hits?.map(hit => ({
          userId: hit._source.userId,
          userName: hit._source.userName,
          firstName: hit._source.firstName,
          languageCode: hit._source.languageCode,
          messageId: hit._source.messageId,
          question: hit._source.question,
          response: hit._source.response,
          requestDate: hit._source.requestDate,
          responseDate: hit._source.responseDate,
        })) ?? [],

      suggestions:
        // eslint-disable-next-line @typescript-eslint/typedef
        suggestions?.map(suggestion => ({
          text: suggestion.text,
          highlighted: suggestion.highlighted,
          score: suggestion.score,
        })) ?? [],
    };

    return dumpedResult;
  }
}
