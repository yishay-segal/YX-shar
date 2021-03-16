import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoute';
import globalErrorHandler from './controllers/errorController';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.use(globalErrorHandler);

export default app;
