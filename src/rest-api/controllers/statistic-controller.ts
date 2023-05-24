import { Request } from 'express';
import { UsersActivityService } from '../../lib/use-cases/statistic/users-activity.service';
import chistaUtils from '../utils/chistaUtils';

export default {
  usersActivity: chistaUtils.makeUseCaseRunner(
    UsersActivityService,
    (req: Request) => req.query,
  ),
};
