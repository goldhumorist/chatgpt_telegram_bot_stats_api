import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/in-question', controllers.search.searchInQuestion);

export default router;
