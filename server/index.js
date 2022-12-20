import express from 'express';
import cors from 'cors';
import { EmailRouter } from './routes/sendEmail.js';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5500;

app.use('/', EmailRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})


