import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/full-text', controllers.search.fullTextSearch);
router.get('/by-username', controllers.search.searchByUsername);

export default router;
