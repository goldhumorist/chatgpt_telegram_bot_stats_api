import { Client } from '@elastic/elasticsearch';
import { IUserRequestLog } from '../interfaces';
import { ElasticSearch } from '../infrastructure/elasticsearch/elasticsearch-connect';

export class UserRequestToGPTLog {
  schema: IUserRequestLog;

  USER_REQUEST_INDEX: string = 'user-request-to-chatgpt';

  protected _client: Client;

  constructor() {
    if (!this._client) this._client = ElasticSearch.getClient();
  }
}

export const userRequestToGPTLog = new UserRequestToGPTLog();
