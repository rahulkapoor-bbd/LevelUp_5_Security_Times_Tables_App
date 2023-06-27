import { Router } from 'express';
import { validateToken } from '../resource-server.js';

const router = Router();

router.get('/', function (req, res, next) {
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;

  const validate = validateToken(accessToken, refreshToken);

  if (validate) {
    console.log(validate.username);
    if (validate.accessToken != undefined) {
       req.session.accessToken = validate.accessToken;
        req.session.refreshToken = validate.refreshToken;
    }
    res.sendFile('leaderboard.html', { root: 'views' });
  }
  else {
    res.status(401).end();
    return;
  }
});

export default router;
