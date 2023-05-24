import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/users-activity', controllers.statistic.usersActivity);

export default router;
