import express from 'express';
import cors from 'cors';

import { loginUser,registerUser } from '../services/user-service';
import { createRegantChart,updateRegantChart,createmonthlyChart ,updateDailyProcedureMonthChart,updateWeeklyProcedureMonthChart,updateMonthlyProcedureMonthChart} from '../services/chart-service';

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

router.post("/register", async (req, res, next) => {
  try {
    await registerUser(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/createRegantChart", async (req, res, next) => {
  try {
    await createRegantChart(req, res);
  } catch (e) {
    next(e);
  }
});
router.post("/updateRegantChart", async (req, res, next) => {
  try {
    await updateRegantChart(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/createMonthChart", async (req, res, next) => {
  try {
    await createmonthlyChart(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/updateDailyProcedureMonthChart", async (req, res, next) => {
  try {
    await updateDailyProcedureMonthChart(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/updateWeeklyProcedureMonthChart", async (req, res, next) => {
  try {
    await updateWeeklyProcedureMonthChart(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/updateMonthlyProcedureMonthChart", async (req, res, next) => {
  try {
    await updateMonthlyProcedureMonthChart(req, res);
  } catch (e) {
    next(e);
  }
});
export default router;
