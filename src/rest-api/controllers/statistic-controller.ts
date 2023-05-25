import { Request } from 'express';
import { UsageActivityService } from '../../lib/use-cases/statistic/usage-activity.service';
import { UsersActivityService } from '../../lib/use-cases/statistic/users-activity.service';
import chistaUtils from '../utils/chistaUtils';

export default {
  usersActivity: chistaUtils.makeUseCaseRunner(
    UsersActivityService,
    (req: Request) => req.query,
  ),

  usageActivity: chistaUtils.makeUseCaseRunner(
    UsageActivityService,
    (req: Request) => req.query,
  ),
};
