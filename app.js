import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { errorStatus } from './const/index.js';
import { handlelibrariesErr } from './helpers/index.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
