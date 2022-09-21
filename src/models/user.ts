import mongoose, {Document} from 'mongoose';
import Joi from "joi";

import {handleSaveErrors} from "../helpers";

const {Schema, model} = mongoose;

export interface IUser extends Document {
    email: string;
    password: string;
    token?: string;
}

const emailRegexp = /^[\w.]+@[\w.]+\.[\w.]+$/

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    token: {
        type: String,
        default: "",
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveErrors);

export const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

export default User;
