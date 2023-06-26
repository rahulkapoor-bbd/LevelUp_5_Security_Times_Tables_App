import { Router } from 'express';
const router = Router();

router.get('/', function (req, res, next) {
  res.sendFile('login.html', { root: 'views' });
});

export default router;
