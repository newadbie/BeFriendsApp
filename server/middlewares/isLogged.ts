import express from 'express';
import { IUser } from '../models/user'; 

const isLogged = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    // TODO First i have to create token to check it!

    // const { token } = req.body.cookies ? req.body.cookies : null;
    // if (!token) {
        // return next();
    // }
    next();
}

export default isLogged;