import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import debug from "debug";

import { validateLoginInput } from '../validation/login';
import { validateRegisterInput } from '../validation/register';

import User from '../models/User';
import CustomError from '../validation/custom-error';

const logger = debug('user-auth-app:user-service:');

const loginUser = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      throw new CustomError(400, 'Login credentials are not valid', errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(404, 'User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      throw new CustomError(400, 'Incorrect password');
    }
  } catch (e) {
    logger(e);
    throw e;
  }
}

const registerUser = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      throw new CustomError(400, 'User input is not valid', errors);
    }
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      throw new CustomError(400, 'Email already exists');
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const userData = await newUser.save();
    res.status(200).json(userData);
    // console.log(saveUser);
  }
  catch (err) {
    logger(err);
    res.status(500).send(err);
  }
}
export { loginUser, registerUser };