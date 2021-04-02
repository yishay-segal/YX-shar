import { Router } from 'express';
import { fileUpload } from '../controllers/fileController';
import { login, signup } from './../controllers/authController';

const fileRouter = Router();

fileRouter.post('/files/upload', ...fileUpload);

export default fileRouter;
