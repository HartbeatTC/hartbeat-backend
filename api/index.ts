import express, { Request, Response, NextFunction } from 'express';
import publicRoute from './publicRoute';
import userRoute from './userRoute';

const router = express.Router();

router.use('/public', publicRoute);
router.use('/user', userRoute);

// error handling
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export default router;
