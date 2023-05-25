import { usageActivityRepo } from './user-request-to-gpt-log/usage-activity.repo';
import { fullTextSearchRepo } from './user-request-to-gpt-log/full-text-search.repo';
import { searchByUsernameRepo } from './user-request-to-gpt-log/search-by-username.repo';
import { usersActivityRepo } from './user-request-to-gpt-log/users-activity.repo';

export const UserRequestToGPTLog = {
  FullTextSearchRepo: fullTextSearchRepo,
  SearchByUsernameRepo: searchByUsernameRepo,
  UsersActivityRepo: usersActivityRepo,
  UsageActivityRepo: usageActivityRepo,
};
