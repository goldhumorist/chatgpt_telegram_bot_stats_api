export interface IUseCaseBase<T, K> {
  execute(data: T): Promise<K>;
  validate?(data: T): Promise<T>;
  run?(params: T): Promise<K>;
}

export type TValidationErrosFields = { [key: string]: string };

export interface IUserRequestLog {
  userId: string | number;
  userName: string;
  firstName: string;
  languageCode: string;
  messageId: number;
  question: string;
  response: string;
  requestDate: Date;
  responseDate: Date;
}

export interface ICustomErrorFields {
  error: string;
  status?: number;
  fields?: TValidationErrosFields;
}

export type IUserRequestLogSuggestions = Array<{
  text: string;
  highlighted: string;
  score: number;
}>;

export type IUnresolvedHits = Array<{
  _index: string;
  _id: string;
  _score: number;
  _source: IUserRequestLog;
}>;

export interface IFullTextSearchDBResponse {
  took: string;
  timed_out: boolean;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: IUnresolvedHits;
  };
  suggest: {
    simple_phrase: Array<{
      text: string;
      offset: number;
      length: number;
      options: Array<{
        text: string;
        highlighted: string;
        score: number;
      }>;
    }>;
  };
}

export interface IFullTextSearchResponseDump {
  total: {
    value: number;
    relation: string;
  };
  hits: Array<IUserRequestLog>;
  suggestions: IUserRequestLogSuggestions;
}

export interface IFullTextSearchParams {
  phraseToSearch: string;
  searchIn: 'question' | 'response';
  page: number;
  limit?: number;
  searchFrom: string;
  searchTo: string;
}

export interface IFullTextSearchResponse {
  data: IFullTextSearchResponseDump;
}
