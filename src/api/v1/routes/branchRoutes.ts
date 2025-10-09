import { Router } from "express";
import * as controller from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchSchema } from "../validation/branchValidation";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(branchSchema), controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;