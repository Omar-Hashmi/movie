import { Router } from 'express';
import { getAllMovies } from '../controller/movieController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllMovies);

export default router;

