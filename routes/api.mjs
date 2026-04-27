import { Router } from 'express';
import { createScore, getScores, updateScore, deleteScore } from '../controllers/scoreController.mjs';
import { isAdmin } from '../middleware/auth.mjs';

const router = Router();

router.post('/scores', createScore);
router.get('/scores', getScores);
router.patch('/scores/:id', isAdmin, updateScore);
router.delete('/scores/:id', isAdmin, deleteScore);

export default router;
