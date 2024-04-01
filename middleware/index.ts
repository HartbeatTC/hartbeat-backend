import { Request, Response, NextFunction } from 'express';
import { addAdmin } from '../utils/addAdmin';

interface DecodedToken {
  uid: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.headers.authorization
    ? req.headers.authorization.split(' ')
    : null;

  console.log('tokenId', tokenId);
  if (!tokenId) {
    console.log('no header provided');
    res.status(401).json({
      error: 401,
      message: 'Unauthorized',
    });
  } else if (!tokenId[1]) {
    console.log('no token provided');
    res.status(401).json({
      error: 401,
      message: 'Unauthorized',
    });
  } else {
    console.log('token provided');
    const { getAuth } = require('firebase-admin/auth');
    addAdmin();
    getAuth()
      .verifyIdToken(tokenId[1])
      .then((decodedToken: DecodedToken) => {
        const uid = decodedToken.uid;
        console.log('uid ---->', uid);
        console.log('isAuthenticated');
        next();
      })
      .catch((err: Error) => {
        console.log(err);
        next(err);
      });
  }
};
