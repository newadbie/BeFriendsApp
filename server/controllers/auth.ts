import express from 'express';

class Authorization {
    private readonly router : express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRouter();
    }

    // signUp = async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    // }

    test = (req : express.Request, res : express.Response, next : express.NextFunction) => {
        return res.json({message: "No hej ho!"});
    }

    private initializeRouter() {
        this.router.get("/test", this.test);
    }

    public getRouter() {
        return this.router;
    }
}
export default Authorization;