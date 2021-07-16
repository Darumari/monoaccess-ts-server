import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

class Server {
  public app: Express;
  private port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  constructor () {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares = () => {
    this.app.use('/api/v1/public', express.static('public'));
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  private routes = () => {
    this.app.get('/', (req: Request, res: Response) =>
      res.send('Mono Access API v1')
    );
  };

  public listen = () => {
    try {
      this.app.listen(this.port, () =>
        console.log('Server listen on port:', this.port)
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default Server;
