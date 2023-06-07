/* eslint-disable */
import pinoHttp from 'pino-http';
import { pinoForLogger } from '../global-helpers/logger.helper';

export const loggerMiddleware = pinoHttp({
  logger: pinoForLogger,
  genReqId(_req) {
    return new Date().getTime().toString();
  },
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
  },
  autoLogging: true,
});
