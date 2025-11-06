import { Router } from "express";
import * as controller from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchSchema } from "../validation/branchValidation";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Branches
 *   description: Endpoints for managing branches
 */

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     description: Returns a list of all branches stored in the database.
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Successfully retrieved all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       500:
 *         description: Server error while retrieving branches
 */
router.get("/", controller.getAll);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a single branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", controller.getById);

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     description: Creates a new branch record after validating the input with Joi.
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Validation error (invalid or missing fields)
 */
router.post("/", validate(branchSchema), controller.create);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Branch not found
 */
router.put("/:id", controller.update);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", controller.remove);

export default router;
