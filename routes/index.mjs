import { Router } from 'express';
import { homePage, gamePage, leaderboardPage } from '../controllers/pageController.mjs';

const router = Router();

router.get('/', homePage);
router.get('/game', gamePage);
router.get('/leaderboard', leaderboardPage);

export default router;
