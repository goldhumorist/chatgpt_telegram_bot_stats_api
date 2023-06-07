import { Client, HttpConnection } from '@elastic/elasticsearch';
import { loggerFactory } from '../../../global-helpers/logger.helper';
import { config } from '../../../config';

const logger = loggerFactory.getLogger(__filename);
export class ElasticSearch {
  /* eslint-disable no-use-before-define */
  private static instance: ElasticSearch;
  private static client: Client;

  static getClient(): Client {
    if (ElasticSearch.client) return ElasticSearch.client;

    ElasticSearch.client = new Client({
      node: config.ELASTIC_SEARCH.URL,
      auth: {
        apiKey: config.ELASTIC_SEARCH.API_KEY,
        username: config.ELASTIC_SEARCH.USERNAME,
        password: config.ELASTIC_SEARCH.PASSWORD,
      },
      requestTimeout: 1000 * 60 * 60,

      Connection: HttpConnection,
    });

    ElasticSearch.client
      .ping()
      .then(() => {
        logger.info('Connected to Elasticsearch was successful!');
      })
      .catch((error: Error) => {
        logger.error('Connection to Elasticsearch unavailable', error);
        throw error;
      });

    ElasticSearch.instance = new ElasticSearch();

    return ElasticSearch.client;
  }
}
