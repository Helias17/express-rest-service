import { Request, Response, Router, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { findUserInDb } from './auth.findUserInDb';
import { ErrorHandler } from '../../services/errors/ErrorHandler';
const bcrypt = require('bcrypt');

const router = Router();

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { login, password } = req.body;
    const user = await findUserInDb(login);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = { login: user.login, id: user.id };
      const token = jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: 60 });
      res.status(200).json({ token });
    }
    throw new ErrorHandler(403, 'Incorrect login or password');
  }
  catch (err) {
    next(err);
  }

});


export { router as loginRouter };
