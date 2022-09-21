import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { IRequestError } from "./interfaces";
import * as routes from "./routes/api"

dotenv.config();

const {DB_HOST = '', PORT = 3000} = process.env;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", routes.auth);
app.use("/api/contacts", routes.contacts);

app.use((req: Request, res: Response): void => {
    const {url} = req;
    res.status(404).json({
        message: `${url} not found`,
    })
});

app.use((error: IRequestError, req: Request, res: Response, _: NextFunction): void => {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
        message,
    })
});

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT))
    .catch((error): void => {
        console.log(error.message);
        process.exit(1);
    });
