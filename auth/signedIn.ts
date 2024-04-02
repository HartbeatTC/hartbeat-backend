const express = require('express');
const router = express.Router();
import { Request, Response, NextFunction } from 'express';
import { isAuthenticated } from '../middleware';

router.get(
  '/',
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      route: 'AUTH TEST PASSED',
      message: 'Hello World!!!!!',
      version: '1.0.0',
      access: 'Admin Route SUCCESS!!!',
    });
  }
);

module.exports = router;
