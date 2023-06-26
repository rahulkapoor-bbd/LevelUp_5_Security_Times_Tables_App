import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.sendFile('timestablegame.html', { root: 'views' });
});

export default router;
