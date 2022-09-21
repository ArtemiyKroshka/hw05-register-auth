import {Response} from "express";
import { IRequest } from "../../middlewares/authenticate";
import Contact, { IContact } from "../../models/contact";
import { RequestError } from "../../helpers";

const getById = async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const result: Array<IContact> | null = await Contact.find({_id: id, owner: req.user?.id});
    if (!result[0]) {
        throw RequestError(404, "Not found")
    }
    res.json(result[0]);
}

export default getById;