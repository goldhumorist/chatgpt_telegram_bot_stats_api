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

export interface IUserRequestLogKeyValue {
  userId: string;
  userName: string;
  firstName: string;
  languageCode: string;
  messageId: string;
  question: string;
  response: string;
  requestDate: string;
  responseDate: string;
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

export interface ICommonSearchDBResponse {
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
  suggest?: {
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
  suggestions?: IUserRequestLogSuggestions;
}

export type ISearchByUsernameResponseDump = IFullTextSearchResponseDump;

export interface IFullTextSearchParams {
  phraseToSearch: string;
  searchIn: 'question' | 'response';
  page: number;
  limit?: number;
  searchFrom?: string;
  searchTo?: string;
}

export interface IFullTextSearchResponse {
  data: IFullTextSearchResponseDump;
}

export interface ISearchByUsernameParams {
  username: string;
  page: number;
  limit?: number;
  searchFrom?: string;
  searchTo?: string;
}

export interface ISearchByUsernameResponse {
  data: ISearchByUsernameResponseDump;
}

export type TRange<T extends string> = {
  [key in T]: { gte?: string; lte?: string };
};
