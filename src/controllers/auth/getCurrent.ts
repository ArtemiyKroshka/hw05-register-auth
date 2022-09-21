import { Response } from "express";

import { IRequest } from "../../middlewares/authenticate";
import Contact, { IContact } from './../../models/contact';

const getCurrent = async(req: IRequest, res: Response): Promise<void>  | never => {
    const result: Array<IContact> = await Contact.find({owner: req.user?.id}, "-owner -createdAt -updatedAt");
    res.json({
        id: req.user?.id,
        email: req.user?.email,
        contacts: result
    })
}

export default getCurrent;