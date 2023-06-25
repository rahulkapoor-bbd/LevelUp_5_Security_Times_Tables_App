import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.sendFile('register.html', { root: 'views' });
});

export default router;
