import { createExpenseService, getExpensesService } from "../services/expenses.services.js";
import { sendResponse } from "../utils/responseHandler.js";

export const createExpenseController = async (req, res, next) => {
  try {
    const expense = await createExpenseService(req.body);
    sendResponse(res, expense, "Gasto registrado correctamente", true, 201);
  } catch (error) {
    next(error);
  }
};

export const getExpensesController = async (req, res, next) => {
    try {
      const expenses = await getExpensesService();
      sendResponse(res, expenses, "Gastos recuperados correctamente");
    } catch (error) {
      next(error);
    }
  };
