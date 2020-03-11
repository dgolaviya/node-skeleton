import express from 'express';
import cors from 'cors';

const userRouter = express.Router();
userRouter.all('*', cors());

userRouter.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

userRouter.get("/currentuser", (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

export default userRouter;
