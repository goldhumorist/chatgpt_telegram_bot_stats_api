import { searchByUsernameRepo } from '../../domain-model/search-by-username.repo';
import UseCaseBase from '../base.service';
import {
  ISearchByUsernameParams,
  ISearchByUsernameResponse,
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
    console.log('SearchByUsernameService', data);

    const result = await searchByUsernameRepo.searchByUserName(data);

    console.log('SearchByUsernameService res', result);

    return { data: result } as any;
  }
}
