import express from 'express';
import accountHomeRouter from './routes/account-home.js';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/api/page/account-home', accountHomeRouter);

app.listen(PORT, () => {
  console.log(`BFF service running on http://localhost:${PORT}`);
});
