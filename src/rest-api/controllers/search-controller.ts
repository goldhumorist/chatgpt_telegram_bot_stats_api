import { Request } from 'express';
import { SearchByUsernameService } from '../../lib/use-cases/search/search-by-username.service';
import FullTextSearchService from '../../lib/use-cases/search/full-text-search.service';
import chista from '../utils/chistaUtils';

export default {
  fullTextSearch: chista.makeUseCaseRunner(
    FullTextSearchService,
    (req: Request) => req.query,
  ),

  searchByUsername: chista.makeUseCaseRunner(
    SearchByUsernameService,
    (req: Request) => req.query,
  ),
};
