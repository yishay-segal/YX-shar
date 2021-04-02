import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoute';
import globalErrorHandler from './controllers/errorController';
import fileRouter from './routes/filesRoute';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', userRouter, fileRouter);
app.use(globalErrorHandler);

export default app;
