import mongoose, {Document, Types} from "mongoose";
import Joi from "joi";
import {handleSaveErrors} from "../helpers";
const {Schema, model} = mongoose;

export interface IContact extends Document {
    _id: number
    name?: string
    email: string
    phone: string
    favorite?: boolean
    owner: Types.ObjectId
}

const contactSchema = new Schema<IContact>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        match: /\+380\d{9}/,
        required: true,
        unique: true,
    },
    favorite: {
        type: Boolean,
        required: false,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true,
    }
}, {versionKey: false, timestamps: true});

export const addSchema = Joi.object({
    owner: Joi.string().required(),
})

contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

export default Contact;