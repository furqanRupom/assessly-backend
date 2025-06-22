import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

const allowedOrigins = process.env.FRONTEND_URLS?.split(',').map(url => url.trim().replace(/\/$/, '')) || [];

app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(cleanOrigin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Tagit pro is Working!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    globalErrorHandler(err, req, res, next);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    notFound(req, res, next);
});

export default app;
