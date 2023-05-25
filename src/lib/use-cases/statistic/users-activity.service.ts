import { UserRequestToGPTLog } from '../../domain-model/index';
import {
  IUsersActivityParams,
  IUsersActivityResponse,
  IUsersActivityResponseDump,
  TSearchDBResponseWithAggrUserActivity,
} from '../../interfaces';
import UseCaseBase from '../base.service';

const { UsersActivityRepo } = UserRequestToGPTLog;

export class UsersActivityService extends UseCaseBase<
  IUsersActivityParams,
  IUsersActivityResponse
> {
  static validationRules: IUsersActivityParams = {
    searchFrom: 'iso_date',
    searchTo: 'iso_date',
  } as unknown as IUsersActivityParams;

  async execute(data: IUsersActivityParams): Promise<IUsersActivityResponse> {
    const response = await UsersActivityRepo.getUsersActivityStatistic(data);

    const dumpedResponse = this.dumpResponse(response);

    return { data: dumpedResponse };
  }

  dumpResponse(
    data: TSearchDBResponseWithAggrUserActivity,
  ): IUsersActivityResponseDump {
    const usersActivity = data.aggregations?.usersActivity;

    const dumpedResult: IUsersActivityResponseDump = {
      numberOfRemainingUsers: usersActivity?.sum_other_doc_count || 0,
      usersActivity: usersActivity?.buckets || [],
    };

    return dumpedResult;
  }
}
