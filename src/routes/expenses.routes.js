import { Router } from "express";
import { createExpenseController, getExpensesController } from "../controllers/expenses.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { expensesSchema } from "../schemas/schemasExpenses/expenses.schema.js";

const router = Router();

router.post("/gastos", validateSchema(expensesSchema), createExpenseController);
router.get("/gastos", getExpensesController);

export default router;
