import { Router } from 'express';
import { validateToken } from '../resource-server.js';

const router = Router();

router.get('/', function (req, res, next) {
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;

  const validate = validateToken(accessToken, refreshToken);

  if (validate) {
    res.sendFile('playgame.html', { root: 'views' });
    if (validate.accessToken != undefined) {
      req.session.accessToken = validate.accessToken;
       req.session.refreshToken = validate.refreshToken;
   }
  }
  else {
    res.status(401).end();
    return;
  }
});

export default router;
