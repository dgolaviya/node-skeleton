import express from 'express';
import cors from 'cors';

const userRouter = express.Router();
userRouter.all('*', cors());

userRouter.get("/currentuser", (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

export default userRouter;
