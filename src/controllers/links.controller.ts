import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { getConnection } from '../database/database';
import errors from '../lib/errors';

export default class Links {
  static async getLinks(req: Request, res: Response) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ invalidToken: true });
    jwt.verify(token, config.secretKey, async (err: any, result: any) => {
      if (err || !result || !result.user_id) {
        return res.status(400).json({ invalidToken: true });
      }
      try {
        const db = await getConnection();
        if (req.params.id) {
          const link = await db.query('SELECT * FROM links WHERE id = ?', [
            req.params.id,
          ]);
          return res.json(link[0]);
        }
        const links = await db.query('SELECT * FROM links WHERE user_id = ?', [
          result.user_id,
        ]);
        console.log(links);
        res.json(links);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  static async add(req: Request, res: Response) {
    const { title, url, description, token } = req.body;
    if (!title || !url || !description) {
      return res.status(400).json({ message: errors.noData });
    }
    if (!token) return res.status(400).json({ invalidToken: true });

    jwt.verify(token, config.secretKey, async (err: any, result: any) => {
      if (err || !result || !result.user_id) {
        return res.status(400).json({ invalidToken: true });
      }
      try {
        const connection = await getConnection();
        const newLink = {
          title,
          url,
          description,
          user_id: result.user_id,
        };

        await connection.query('INSERT INTO links set ?', [newLink]);

        res.json({ ok: true });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ invalidToken: true });
    }
    if (!id) {
      return res.status(400).json({ message: errors.noData });
    }
    jwt.verify(token, config.secretKey, async (err: any, result: any) => {
      if (err || !result || !result.user_id) {
        return res.status(400).json({ invalidToken: true });
      }
      try {
        const connection = await getConnection();
        await connection.query('DELETE FROM links WHERE id = ?', [id]);

        res.json({ ok: true });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  static async edit(req: Request, res: Response) {
    const id = req.params.id;
    const { title, description, url, token } = req.body;
    if (!id || !title || !description || !url) {
      return res.status(400).json({ message: errors.noData });
    }
    if (!token) {
      return res.status(400).json({ invalidToken: true });
    }
    jwt.verify(token, config.secretKey, async (err: any, result: any) => {
      if (err || !result || !result.user_id) {
        return res.status(400).json({ invalidToken: true });
      }
      try {
        const newLink = {
          title,
          description,
          url,
        };
        const connection = await getConnection();
        connection.query('UPDATE links set ? WHERE id  = ?', [newLink, id]);
        res.json({ ok: true });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    });
  }
}
