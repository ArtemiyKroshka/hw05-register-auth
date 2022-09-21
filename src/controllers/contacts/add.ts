import {Response} from "express";
import Contact, { IContact } from './../../models/contact';
import { IRequest } from "../../middlewares/authenticate";

const add = async (req: IRequest, res: Response): Promise<void | never> => {
    req.body.owner = req.user?.id;
    const result: IContact = await Contact.create(req.body);
    res.status(201).json(result)
}

export default add;