import express from 'express';
import * as bodyParser from "body-parser";
import cors from 'cors';
import { EmailRouter } from './routes/sendEmail.js';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(process.cwd().slice(0, -6) + 'client\\dist\\'));

dotenv.config();

const port = process.env.PORT || 5500;

app.use('/', EmailRouter);

app.get('/', (req, res, next) => {
  res.sendFile(process.cwd().slice(0, -6) + 'client\\dist\\index.html');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})


