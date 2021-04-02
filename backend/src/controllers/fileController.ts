import multer from 'multer';
import path from 'path';
import express, { Router } from 'express';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const fileUploadSuccess = (req: express.Request, res: express.Response) => {
    try {
        res.status(201).json({ file: req.file });
    } catch (error) {
        console.log(error);
    }
};

export const fileUpload = [upload.single('file'), fileUploadSuccess];
