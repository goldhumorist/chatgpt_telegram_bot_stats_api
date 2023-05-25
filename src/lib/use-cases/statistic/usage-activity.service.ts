import {
  IUsageActivityParams,
  IUsageActivityResponse,
  IUsageActivityResponseDump,
  TSearchDBResponseWithAggrUsageActivity,
} from '../../interfaces';
import { UserRequestToGPTLog } from '../../domain-model/index';
import UseCaseBase from '../base.service';

const { UsageActivityRepo } = UserRequestToGPTLog;

export class UsageActivityService extends UseCaseBase<
  IUsageActivityParams,
  IUsageActivityResponse
> {
  static validationRules: IUsageActivityParams = {
    calendarInterval: ['required', { one_of: ['day', 'week', 'month'] }],
    searchFrom: ['required', 'iso_date'],
    searchTo: [
      'required',
      'iso_date',
      { month_time_difference: ['searchFrom', 3] },
    ],
  } as unknown as IUsageActivityParams;

  async execute(data: IUsageActivityParams): Promise<IUsageActivityResponse> {
    const response = await UsageActivityRepo.getUsageActivityStatistic(data);

    const dumpedResponse = this.dumpResponse(response);

    return { data: dumpedResponse };
  }

  dumpResponse(
    data: TSearchDBResponseWithAggrUsageActivity,
  ): IUsageActivityResponseDump {
    const usageActivity = data.aggregations?.usageActivity;

    const dumpedResult: IUsageActivityResponseDump = {
      usageActivity: usageActivity?.buckets || [],
    };

    return dumpedResult;
  }
}
