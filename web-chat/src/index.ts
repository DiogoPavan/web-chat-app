import express from 'express';
import cors from 'cors';
import { env } from './utils/env';

const app = express();

app.use(
  cors(),
  express.json(),
);

app.get('/', (req, res) => {
  res.send({
    ok: 'show de banda',
  });
});

app.listen(env.httpPort, () => {
  console.log('Web chat initialized');
});
