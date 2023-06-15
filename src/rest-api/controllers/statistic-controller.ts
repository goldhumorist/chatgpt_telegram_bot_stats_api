import { Request } from 'express';
import { UsageActivityService } from '../../lib/use-cases/statistic/usage-activity.service';
import { UsersActivityService } from '../../lib/use-cases/statistic/users-activity.service';
import { makeUseCaseRunner } from '../utils/use-case-runner';

export default {
  usersActivity: makeUseCaseRunner(
    new UsersActivityService(),
    (req: Request) => req.query,
  ),

  usageActivity: makeUseCaseRunner(
    new UsageActivityService(),
    (req: Request) => req.query,
  ),
};
