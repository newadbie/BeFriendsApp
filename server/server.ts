import App from './app'
import AuthController from './controllers/auth';
import UserService from './services/UserService';

const app : App = new App(8080, [
    new AuthController(new UserService).getRouter()
])


app.listen();
