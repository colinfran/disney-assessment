import express from 'express';
import cors from 'cors'
import { root } from './utils/index.js';
import { indexRouter } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${root}/public`));
app.use(cors({origin: '*'}));

/* Routes */
app.use('/', indexRouter);

/* Start */
app.listen(3000, () =>
  console.log(`Disney assessment app listening on port 3000!`),
);