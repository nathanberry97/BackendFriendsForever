import express from 'express';
import udpRouter from './routes/udp.js';
import hmrcRouter from './routes/hmrc.js';
import dvlaRouter from './routes/dvla.js';
import dwpRouter from './routes/dwp.js';

const app = express();
const PORT = 4001;

app.use(express.json());

app.use('/api/udp', udpRouter);
app.use('/api/hmrc', hmrcRouter);
app.use('/api/dvla', dvlaRouter);
app.use('/api/dwp', dwpRouter);

app.listen(PORT, () => {
  console.log(`Mock APIs running on http://localhost:${PORT}`);
});
