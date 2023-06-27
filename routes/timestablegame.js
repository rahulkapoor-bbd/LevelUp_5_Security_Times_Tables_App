import { Router } from 'express';
import { validateToken } from '../resource-server.js';

const router = Router();

router.get('/', function (req, res, next) {
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;

  const validate = validateToken(accessToken);

  if (validate) {
    res.sendFile('timestablegame.html', { root: 'views' });
  }
  else {
    res.status(401).end();
    return;
  }
});

export default router;
