import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loggerMiddleware } from '../../middlewares/logger.middleware';
import Routers from '../routers/index';
import { errorHandler, notFound } from '../../lib/helpers/not-found-error';

const { mainSeachRouter, statisticRouter } = Routers;
const app = express();

/** Setup CORS policy */
app.use(cors());
/** Setup parsing urlencoded body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Setup secure Express app by setting HTTP response headers */
app.use(helmet());

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204));

app.use(loggerMiddleware);

app.use('/api/v1/search', mainSeachRouter);
app.use('/api/v1/statistic', statisticRouter);

app.use(notFound);
app.use(errorHandler);

process.on('unhandledRejection', (reason: Error) => {
  console.error('unhandledRejection', reason);
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  console.error('uncaughtException', error);

  process.exit(1);
});

export default app;
