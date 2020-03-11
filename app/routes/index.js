import express from 'express';
import cors from 'cors';

import { loginUser } from '../services/user-service';

const router = express.Router();
router.all('*', cors());

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", async (req, res, next) => {
  try {
    await loginUser(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
