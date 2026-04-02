import { Router } from 'express';
import { createScore, getScores, deleteScore } from '../controllers/scoreController.mjs';

const router = Router();

router.post('/scores', createScore);
router.get('/scores', getScores);
router.delete('/scores/:id', deleteScore);

export default router;
