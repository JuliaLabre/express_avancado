// src/controllers/exampleController.ts
import { Request, Response } from 'express';

export const User = (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
};
