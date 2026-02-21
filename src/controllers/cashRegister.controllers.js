import {
  closeCashRegisterServices,
  getActiveCashServices,
  getCashRegisterServices,
  openCashRegisterServices,
} from "../services/cashRegister.services.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getCashRegisterController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const CashRegister = await getCashRegisterServices(id);
    sendResponse(res, CashRegister, "Caja Encontrada");
  } catch (error) {
    next(error);
  }
};

export const getActiveCashController = async (req, res, next) => {
  try {
    const getActiveCash = await getActiveCashServices();
    sendResponse(res, getActiveCash, "Caja Activa Encontrada");
  } catch (error) {
    next(error);
  }
};

export const openCashRegisterController = async (req, res, next) => {
  try {
    const openCashRegister = await openCashRegisterServices(req.body);
    sendResponse(res, openCashRegister, "Caja Abierta con exito");
  } catch (error) {
    next(error);
  }
};

export const closeCashRegisterController = async (req, res, next) => {
  try {
    const { id_caja, monto_final } = req.body;
    const closedCashRegister = await closeCashRegisterServices(
      id_caja,
      monto_final,
    );

    if (closedCashRegister >= 1) {
      return sendResponse(res, null, "La caja fue cerrada con exito");
    } else {
      throw { status: 404, message: "No se pudo cerrar la caja" };
    }
  } catch (error) {
    next(error);
  }
};
