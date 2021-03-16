import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import AppError from '../utils/appError';

interface UserIn {
  _id?: string;
  name: string;
  email: string;
  password: string;
  updatedAt?: string;
}

interface DecodedIn {
  id: string;
  iat: number;
  exp: number;
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const changePasswordAfter = (jwtTimestamp: number, user: UserIn) => {
  const updateDate = new Date(user.updatedAt!).getTime() / 1000;
  return jwtTimestamp < updateDate;
};

const createSendToken = (
  user: UserIn,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id!);

  res.status(statusCode).json({
    status: 'success',
    token,
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
    },
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = (req.body as UserIn)!;
    const user = await User.findOne({ email });
    if (user) {
      return next(new AppError('User is already exists'));
    }
    const encrypPass = await bcrypt.hash(password.toString(), 12);

    const newUser = await User.create({ name, email, password: encrypPass });

    createSendToken(newUser, 201, req, res);
  } catch (error) {
    return res.status(400).send({
      err: error.message,
    });
  }
};

const correctPassword = async (sentPassword: string, userPassword: string) => {
  return await bcrypt.compare(sentPassword, userPassword);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const password = req.body.password.toString();

    if (!email || !password) {
      return next(new AppError('Please provide email and password'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password'));
    }

    createSendToken(user!, 200, req, res);
  } catch (error) {
    next(error);
  }
};
