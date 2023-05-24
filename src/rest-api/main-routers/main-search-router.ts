import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/full-text', controllers.search.fullTextSearch);

export default router;
