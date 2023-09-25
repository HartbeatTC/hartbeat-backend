import express, { Request, Response } from 'express';
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,PUT,PATCH,HEAD,POST,DELETE',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).json({
    route: 'API TEST',
    message: 'Hello World',
    version: '1.0.0',
    access: 'public',
  });
});

const setupRoutes = async () => {
  console.log('routes setup here');
};
const runServer = async (port: string | number) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const configureApp = async (port: string | number) => {
  await setupRoutes();
  return runServer(port);
};

module.exports = configureApp(PORT);
