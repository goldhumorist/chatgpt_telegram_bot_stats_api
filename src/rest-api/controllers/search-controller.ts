import { Request } from 'express';
import { SearchByUsernameService } from '../../lib/use-cases/search/search-by-username.service';
import FullTextSearchService from '../../lib/use-cases/search/full-text-search.service';
import { makeUseCaseRunner } from '../utils/use-case-runner';

export default {
  fullTextSearch: makeUseCaseRunner(
    new FullTextSearchService(),
    (req: Request) => req.query,
  ),

  searchByUsername: makeUseCaseRunner(
    new SearchByUsernameService(),
    (req: Request) => req.query,
  ),
};
