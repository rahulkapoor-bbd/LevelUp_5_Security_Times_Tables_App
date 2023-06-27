import { Router } from 'express';
import { invalidateToken } from '../resource-server.js'
const router = Router();

router.get('/', function (req, res, next) {
  if (req.session.accessToken != undefined) {
    invalidateToken(req.session.accessToken)
  }
  fetch(`${process.env.IDENTITY_URL}/identity/logout`, {
    method: 'POST',
    body: `token=${req.session.accessToken}&refreshToken=${req.session.refreshToken}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});
  req.session.destroy()
  res.sendFile('home.html', { root: 'views' });
});

export default router;
