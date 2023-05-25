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

export type TElasticSuggestions = {
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

export type TCommonDBResponse = {
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
};

export type TSearchDBResponseWithSuggestions = TCommonDBResponse & {
  suggest: TElasticSuggestions;
};

export type TCommonSearchResponseDump = {
  total: {
    value: number;
    relation: string;
  };
  hits: Array<IUserRequestLog>;
};

export type TFullTextSearchResponseDump = TCommonSearchResponseDump & {
  suggestions: IUserRequestLogSuggestions;
};

export type ISearchByUsernameResponseDump = TCommonSearchResponseDump;

export interface IFullTextSearchParams {
  phraseToSearch: string;
  searchIn: 'question' | 'response';
  page: number;
  limit?: number;
  searchFrom?: string;
  searchTo?: string;
}

export interface IFullTextSearchResponse {
  data: TFullTextSearchResponseDump;
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

export interface IUsersActivityParams {
  searchFrom?: string;
  searchTo?: string;
}

export interface IUsersActivityResponseDump {
  numberOfRemainingUsers: number;
  usersActivity: Array<{ key: string; doc_count: number }>;
}

export interface IUsersActivityResponse {
  data: IUsersActivityResponseDump;
}

export interface IUniqueUsersAggregation {
  value: number;
}

export type TSearchDBResponseWithAggrUserActivity = TCommonDBResponse & {
  aggregations?: {
    usersActivity: {
      doc_count_error_upper_bound: number;
      sum_other_doc_count: number;
      buckets: Array<{ key: string; doc_count: number }>;
    };
  };
};

export interface IUsageActivityParams {
  calendarInterval: 'day' | 'week' | 'month';
  searchFrom: string;
  searchTo: string;
}

export interface IUsageActivityResponseDump {
  usageActivity: Array<{
    key_as_string: string;
    key: number;
    doc_count: number;
  }>;
}

export interface IUsageActivityResponse {
  data: IUsageActivityResponseDump;
}

export type TSearchDBResponseWithAggrUsageActivity = TCommonDBResponse & {
  aggregations?: {
    usageActivity: {
      buckets: Array<{ key_as_string: string; key: number; doc_count: number }>;
    };
  };
};
