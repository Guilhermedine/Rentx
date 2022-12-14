import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from 'swagger.json';
import '../typeorm/ormconfig'
import '@shared/container';
import { AppError } from '../../errors/AppError';




const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) =>{
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});

app.listen(3000, () => console.log("Server is Running"));