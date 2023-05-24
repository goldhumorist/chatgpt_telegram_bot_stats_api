import validator from 'validator';
import { fullTextSearchRepo } from '../../domain-model/full-text-search.repo';
import {
  IFullTextSearchResponse,
  IFullTextSearchResponseDump,
  ISearchInQuestionParams,
  ISearchInQuestionResponse,
  IUseCaseBase,
} from '../../interfaces';
import UseCaseBase from '../base.service';

export default class SearchInQuestion
  extends UseCaseBase<ISearchInQuestionParams, ISearchInQuestionResponse>
  implements IUseCaseBase<ISearchInQuestionParams, ISearchInQuestionResponse>
{
  static validationRules: ISearchInQuestionParams = {
    phraseToSearch: ['required', { min_length: 2 }],
    searchIn: ['required', { one_of: ['question', 'response'] }],
    page: ['required', 'positive_integer', { min_number: 1 }],
    limit: ['positive_integer', { min_number: 1 }],
    searchFrom: 'iso_date',
    searchTo: 'iso_date',
  } as unknown as ISearchInQuestionParams;

  async sanitize(
    data: ISearchInQuestionParams,
  ): Promise<ISearchInQuestionParams> {
    return {
      ...data,
      phraseToSearch: validator.blacklist(data.phraseToSearch || '', '*'),
    };
  }

  async execute(data: ISearchInQuestionParams) {
    const response = await fullTextSearchRepo.searchInQuestionField(data);

    const dumpedResponse = this.dumpResponse(response);

    return { data: dumpedResponse };
  }

  dumpResponse(data: IFullTextSearchResponse): IFullTextSearchResponseDump {
    const { hits } = data.hits;
    const suggestions = data.suggest.simple_phrase[0]?.options;

    const dumpedResult: IFullTextSearchResponseDump = {
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
