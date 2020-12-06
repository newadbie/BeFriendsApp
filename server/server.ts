import App from './app'
import AuthController from './controllers/auth';
import LoanController from './controllers/loan';

const app : App = new App(8080, [
    new AuthController().getRouter(),
    new LoanController().getRouter()
])


app.listen();

export default app;