import express from 'express';
import cors from 'cors';

const router = express.Router();
router.all('*', cors());

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get("/currentuser", (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

export default router;
