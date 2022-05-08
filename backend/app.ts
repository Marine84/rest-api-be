import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Controller from '../backend/interface/controller.interface';
import Middleware from './exceptions/error.middleware';

class App {
  public app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express();

    App.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  };

  public listen() {
    this.app.listen(5000, () => {
      console.log(`App listening on the port ${5000}`)
    })
  };

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
  };

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  };

  private initializeErrorHandling() {
    this.app.use(Middleware.errorMiddleware);
  };

  private static connectToTheDatabase() {
    const
      MONGO_USER = 'accountUser',
      MONGO_PASSWORD = 'test',
      MONGO_PATH = '@localhost:27017/test-user?authSource=admin';

    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  };
}

export default App;