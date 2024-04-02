import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import { CorsOptions } from 'cors';
import morgan from 'morgan';
import apiRoutes from './api';

require('dotenv').config();

const whiteList = [
  process.env.LOCAL_URL,
  'http://localhost:5173',
  process.env.NGROK_URL,
];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,PATCH,HEAD,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(401).json({
    message:
      'Hello from Hartbeat TC! Unfortunately, you are not authorized to access this page.',
    status: 401,
    error: 'Unauthorized',
  });
});

// app.use('/');
// error handling endware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.stack);
  const errStatus = (err as any).status || 500;
  res.status(errStatus).send(err.message || 'Internal server error.');
});

export default app;
