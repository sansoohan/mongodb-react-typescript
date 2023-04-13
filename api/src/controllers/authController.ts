import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import User, { IUser } from '../models/User';

// ... 以下略 ...

export const signIn = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    const user: IUser | null = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = crypto.pbkdf2Sync(password, user.passwordSalt, 1000, 64, 'sha1').toString('base64') === user.passwordHash;

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    res.cookie('jwt', token, { httpOnly: true });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    const existingUser = await User.findOne({ id });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordSalt = nanoid();

    const passwordHash = crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha1').toString('base64');

    const user = new User({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
