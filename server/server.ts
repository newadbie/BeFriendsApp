import App from './app'
import AuthController from './controllers/auth';

const app : App = new App(8080, [
    new AuthController().getRouter()
])


app.listen();
