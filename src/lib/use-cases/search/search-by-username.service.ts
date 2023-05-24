import { searchByUsernameRepo } from '../../domain-model/search-by-username.repo';
import UseCaseBase from '../base.service';
import {
  ICommonSearchDBResponse,
  ISearchByUsernameParams,
  ISearchByUsernameResponse,
  ISearchByUsernameResponseDump,
} from '../../interfaces';

export class SearchByUsernameService extends UseCaseBase<
  ISearchByUsernameParams,
  ISearchByUsernameResponse
> {
  static validationRules: ISearchByUsernameParams = {
    username: ['required', { min_length: 2 }],
    page: ['required', 'positive_integer', { min_number: 1 }],
    limit: ['positive_integer', { min_number: 1 }],
    searchFrom: 'iso_date',
    searchTo: 'iso_date',
  } as unknown as ISearchByUsernameParams;

  async execute(
    data: ISearchByUsernameParams,
  ): Promise<ISearchByUsernameResponse> {
    const response = await searchByUsernameRepo.searchByUserName(data);

    const dumpedResponse = this.dumpResponse(response);

    return { data: dumpedResponse };
  }

  dumpResponse(data: ICommonSearchDBResponse): ISearchByUsernameResponseDump {
    const { hits } = data.hits;

    const dumpedResult: ISearchByUsernameResponseDump = {
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
    };

    return dumpedResult;
  }
}
