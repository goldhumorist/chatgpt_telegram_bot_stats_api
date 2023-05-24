import { Request } from 'express';
import FullTextSearchService from '../../lib/use-cases/search/full-text-search.service';
import chista from '../utils/chistaUtils';

export default {
  fullTextSearch: chista.makeUseCaseRunner(
    FullTextSearchService,
    (req: Request) => {
      return { ...req.query };
    },
  ),
};
