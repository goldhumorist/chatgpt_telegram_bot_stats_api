import { Client, HttpConnection } from '@elastic/elasticsearch';
import { config } from '../../../config';

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
        console.log('Connected to Elasticsearch was successful!');
      })
      .catch((error: Error) => {
        console.error('Connection to Elasticsearch unavailable', error);
        throw error;
      });

    ElasticSearch.instance = new ElasticSearch();

    return ElasticSearch.client;
  }
}
