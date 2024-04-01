const express = require('express');
const router = express.Router();
import { Request, Response, NextFunction } from 'express';
import { isAuthenticated } from '../middleware';

// let firebaseApp = null as any;
// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   console.log('authMiddleware');
//   const admin = require('firebase-admin');

//   const serviceAccount = require('../admin.json');
//   if (!firebaseApp) {
//     firebaseApp = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   }

//   console.log('firebaseApp', firebaseApp);
//   //   console.log('request in auth', req);
//   console.log('token? --->', req.headers);
//   console.log('token? --->', req.headers.authorization);
//   console.log('req header???', req.header);

//   next();
// };

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
