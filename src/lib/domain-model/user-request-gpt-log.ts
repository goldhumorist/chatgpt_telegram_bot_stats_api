import { Client } from '@elastic/elasticsearch';
import { IUserRequestLogKeyValue, IUserRequestLog } from '../interfaces';
import { ElasticSearch } from '../infrastructure/elasticsearch/elasticsearch-connect';

export class UserRequestToGPTLog {
  protected schemaTypes: IUserRequestLog;

  protected schemaKeyValue: IUserRequestLogKeyValue = {
    userId: 'userId',
    userName: 'userName',
    firstName: 'firstName',
    languageCode: 'languageCode',
    messageId: 'messageId',
    question: 'question',
    response: 'response',
    requestDate: 'requestDate',
    responseDate: 'responseDate',
  };

  protected USER_REQUEST_INDEX: string = 'user-request-to-chatgpt';

  protected _client: Client;

  constructor() {
    if (!this._client) this._client = ElasticSearch.getClient();
  }
}

export const userRequestToGPTLog = new UserRequestToGPTLog();
