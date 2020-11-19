import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './config/winston';

// import todoRoutes from './routes/TodoRoutes';

process.on('uncaughtException', (e) => {
  console.log('uncaught exception  :>>  ', e);
});

const app = express();
const port = 8000;

app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message)
    }
  })
);

app.use(cors());
app.use(express.json());

//app.use('/api/todos', todoRoutes);

app.get('/', (req: Request, res: Response) => {
  logger.info('blaInfo');
  logger.debug('blaDebug');
  logger.error('blaError');

  res.send(`Hello World ! Does this still work?`);
});

app.post('/test', (req, res) => {
  res.send('ok');
});

app.get('*', (req: Request, res: Response) =>
  res.status(200).send({
    message: 'This is the todolist API, but this was not a valid route.'
  })
);

app.post('*', (req: Request, res: Response) =>
  res.status(200).send({
    message: 'This is the todolist API, but this was not a valid route.'
  })
);

app.listen(port, () => {
  console.log(`The server is running on port ${port}!`);
});
