import { Router } from 'express';
import { homePage, gamePage, leaderboardPage } from '../controllers/pageController.mjs';
import { loginPage, loginAdmin, logout } from '../controllers/authController.mjs';

const router = Router();

router.get('/', homePage);
router.get('/game', gamePage);
router.get('/leaderboard', leaderboardPage);
router.get('/auth/login', loginPage);
router.post('/auth/login', loginAdmin);
router.get('/auth/logout', logout);

export default router;
