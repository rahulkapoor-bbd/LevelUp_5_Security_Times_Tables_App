import { Router } from 'express';
import { config } from 'dotenv';
const router = Router();
config();

router.get('/', function(req, res, next) {
  res.redirect(process.env.IDENTITY_URL_REGISTER);
});

export default router;
