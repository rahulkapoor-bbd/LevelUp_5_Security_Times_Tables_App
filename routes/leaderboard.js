import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.sendFile('leaderboard.html', { root: 'views' });
});

export default router;
