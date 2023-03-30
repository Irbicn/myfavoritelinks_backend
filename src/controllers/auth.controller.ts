import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import config from '../config';
import { getConnection } from '../database/database';
import { encrypt, match } from '../lib/helpers';
import errors from '../lib/errors';

export default class Auth {
  static async signup(req: Request, res: Response) {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res.send({ message: errors.noData });
    }
    try {
      const db = await getConnection();
      const user = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
      if (user[0]) {
        return res
          .status(400)
          .json({ message: 'Este email ya esta registrado' });
      }
      const newUser = {
        username: name,
        password: await encrypt(password),
        email,
      };
      const result = await db.query('INSERT INTO users SET ?', [newUser]);

      const token = jwt.sign(
        { username: name, email, user_id: result.insertId },
        config.secretKey
      );
      res.json({ token });
    } catch (err: any) {
      res.status(500).json({ err: err.message });
    }
  }
  static async signin(req: Request, res: Response) {
    const { name, password, email } = req.body;
    try {
      const db = await getConnection();
      const user = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
      if (!user[0]) {
        return res.status(400).json({ message: errors.invalidUser });
      }
      bc.compare(password, user[0].password, (err, result) => {
        if (err || !result) {
          return res.status(400).json({ message: errors.invalidPassword });
        }
        const cleanUser = {
          username: user[0].username,
          email: user[0].email,
          user_id: user[0].id,
        };
        const token = jwt.sign(cleanUser, config.secretKey);
        res.json({ token });
      });
    } catch (err: any) {
      res.status(500).json({ err: err.message });
    }
  }
}
