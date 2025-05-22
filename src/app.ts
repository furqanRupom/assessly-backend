import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())
app.use('/api/v1/', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Mongo App is Working!')
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    globalErrorHandler(err, req, res, next)
});
app.use((req: Request, res: Response, next: NextFunction) => {
    notFound(req, res, next)
});
export default app