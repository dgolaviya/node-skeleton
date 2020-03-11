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

export { loginUser };