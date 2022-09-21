import {Response} from "express";
import { IRequest } from "../../middlewares/authenticate";
import Contact, { IContact } from "../../models/contact";
import { RequestError } from "../../helpers";

const updateById = async (req: IRequest, res: Response): Promise<void | never> => {
    const { id, field } = req.params;
    if (field && (req.body[field] === undefined || !Contact.schema.paths[field])) {
        throw RequestError(400, `Missing field ${field}`);
    }
    const result: IContact | null = await Contact.findOneAndUpdate({_id: id, owner: req.user?.id}, req.body, {new: true, runValidators: true});
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.json(result);
}

export default updateById;