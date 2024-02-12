import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config';
import {
  errorStatus,
  apiDocsPath,
  authPath,
  boardsPath,
  wallpaperPath,
  columnsPath,
  cardsPath,
  userPath,
  needHelpPath,
} from './const/index.js';
import { handlelibrariesErr, getSwaggerDocument } from './helpers/index.js';

import authRouter from './routes/api/auth-router.js';
import boardsRouter from './routes/api/boards-router.js';
import wallpaperRouter from './routes/api/wallpapers-router.js';
import columnsRouter from './routes/api/columns-router.js';
import cardsRouter from './routes/api/cards-router.js';
import userRouter from './routes/api/user-router.js';
import helpRouter from './routes/api/help-router.js';

// ============================================================

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(
  apiDocsPath.ROOT,
  swaggerUi.serve,
  swaggerUi.setup(getSwaggerDocument())
);

app.use(authPath.ROOT, authRouter);
app.use(userPath.ROOT, userRouter);
app.use(boardsPath.ROOT, boardsRouter);
app.use(wallpaperPath.ROOT, wallpaperRouter);
app.use(columnsPath.ROOT, columnsRouter);
app.use(cardsPath.ROOT, cardsRouter);
app.use(needHelpPath.ROOT, helpRouter)

app.use((req, res) => {
  res.status(errorStatus.NOT_FOUND.status).json(errorStatus.NOT_FOUND);
});

app.use((err, req, res, next) => {
  const error = handlelibrariesErr(err);

  const {
    status = errorStatus.SERVER_ERR.status,
    message = errorStatus.SERVER_ERR.message,
    code = errorStatus.SERVER_ERR.code,
  } = error;

  res.status(status).json({ status, message, code });
});

export default app;
