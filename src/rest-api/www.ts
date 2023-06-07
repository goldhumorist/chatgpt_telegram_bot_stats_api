/* eslint-disable */
import http from 'http';
import { config } from '../config';
import app from './app/app';
import { ElasticSearch } from '../lib/infrastructure/elasticsearch/elasticsearch-connect';
import { loggerFactory } from './../global-helpers/logger.helper';
const logger = loggerFactory.getLogger(__filename);

const port = normalizePort(config.SERVER.PORT);
const host = config.SERVER.HOST;

const server = http.createServer(app);

server.listen(port, host);

server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
async function onListening() {
  logger.info(`CONFIG`, config);

  await ElasticSearch.getClient();

  logger.info(`Application is running on ${host}:${port}.`);

  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;

  logger.info(`Listening on ${bind}`);
}

/**
 * Helper
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
