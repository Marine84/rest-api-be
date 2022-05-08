import App from './app';
import UsersController from './controllers/users';

const app = new App(
  [
    new UsersController(),
  ],
);

app.listen();