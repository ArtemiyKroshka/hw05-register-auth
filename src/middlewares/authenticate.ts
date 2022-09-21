import { Request } from "express";
import passport from "passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

import User, {IUser} from "../models/user";

import { RequestError } from "../helpers";

dotenv.config();

const {SECRET_KEY = ""} = process.env;

export interface IRequest extends Request {
    user?: IUser | undefined
}

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new Strategy(params, async(payload, done) => {
    const user: IUser | null = await User.findById(payload.id);
    if(!user) {
        done(RequestError(401, "User not found"));
    }
    if(!user?.token) {
        done(RequestError(401, "Token expired"));
    }
    done(null, user);
});

passport.use("jwt", jwtStrategy);

const authenticate = passport.authenticate("jwt", {session: false});

export default authenticate;
