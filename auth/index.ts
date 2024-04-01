const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';

router.use('/signedIn', require('./signedIn'));

router.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// import { Request, Response, NextFunction } from 'express';
// import { isAuthenticated } from '../middleware';

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

// // const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
// //   const tokenId = req.headers.authorization
// //     ? req.headers.authorization.split(' ')
// //     : null;

// //   console.log('tokenId', tokenId);
// //   if (!tokenId) {
// //     console.log('no header provided');
// //     next();
// //     // return res.status(401).json({
// //     //   route: 'Unauthorized',
// //     //   message: 'Unauthorized',
// //     //   version: 'x.x.x',
// //     //   access: 'Unauthorized',
// //     // });
// //   } else if (!tokenId[1]) {
// //     console.log('no token provided');
// //     next();
// //     // return res.status(401).json({
// //     //   route: 'Unauthorized',
// //     //   message: 'Unauthorized',
// //     //   version: 'x.x.x',
// //     //   access: 'Unauthorized',
// //     // });
// //   } else {
// //     console.log('token provided');
// //     const { getAuth } = require('firebase-admin/auth');

// //     getAuth()
// //       .verifyIdToken(tokenId[1])
// //       .then((decodedToken: DecodedToken) => {
// //         const uid = decodedToken.uid;
// //         console.log('uid ---->', uid);
// //         next();
// //       })
// //       .catch((err: Error) => {
// //         console.log(err);
// //         // return res.status(401).json({
// //         //   route: 'Unauthorized',
// //         //   message: 'Unauthorized',
// //         //   version: 'x.x.x',
// //         //   access: 'Unauthorized',
// //         // });
// //       });
// //   }
// //   console.log('isAuthenticated');
// //   next();
// // };

// router.get(
//   '/',
//   isAuthenticated,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json({
//       route: 'AUTH TEST PASSED',
//       message: 'Hello World!!!!!',
//       version: '1.0.0',
//       access: 'Admin Route SUCCESS!!!',
//     });
//   }
// );

// module.exports = router;
