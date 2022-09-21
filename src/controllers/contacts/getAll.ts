import {Request, Response} from "express";
import Contact, { IContact } from "../../models/contact";

const getAll = async (req: Request, res: Response): Promise<void> => {
    const result: Array<IContact> = await Contact.find({});
    res.json(result);
}

export default getAll;