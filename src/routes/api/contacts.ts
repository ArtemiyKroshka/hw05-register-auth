import express from "express";

import * as ctrl from "../../controllers/contacts";

import {ctrlWrapper} from "../../helpers";

import {authenticate} from '../../middlewares';

const router = express.Router();


router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, ctrlWrapper(ctrl.add));

router.put("/:id", authenticate, ctrlWrapper(ctrl.updateById));

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeById));

router.patch("/:id/:field", authenticate, ctrlWrapper(ctrl.updateById));

export default router;