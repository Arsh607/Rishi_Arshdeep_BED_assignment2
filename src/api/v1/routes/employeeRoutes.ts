import { Router } from "express";
import * as ctrl from "../controllers/employeeController";
import { validate } from "../middleware/validate";
import { employeeSchema } from "../validation/employeeValidation";

const router = Router();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", validate(employeeSchema), ctrl.create);
router.put("/:id", ctrl.update);;
router.delete("/:id", ctrl.remove);

export default router;

