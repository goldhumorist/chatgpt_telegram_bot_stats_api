import { Request } from 'express';
import SearchInQuestion from '../../lib/use-cases/search/search-in-question.service';
import chista from '../utils/chistaUtils';

export default {
  searchInQuestion: chista.makeUseCaseRunner(
    SearchInQuestion,
    (req: Request) => {
      return { ...req.query };
    },
  ),
};
