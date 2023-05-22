import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

/** Setup CORS policy */
app.use(cors());
/** Setup parsing urlencoded body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Setup secure Express app by setting HTTP response headers */
app.use(helmet());

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204));

app.use((req: Request, res: Response) => {
  console.log('INIT request handler');
  res.end('SUCCESS');
});

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  console.error('uncaughtException', error);

  process.exit(1);
});

export default app;
