/*  eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';
import { Rent } from '../models/Rent';

export const rents = Router();

rents.post('/', async (req, res, next) => {
  try {
    const rent = await Rent.create(req.body);
    res.status(201).json(rent);
  } catch (e) {
    next(e);
  }
});
