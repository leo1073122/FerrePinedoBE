import {
  activateProductService,
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from "../services/productos.services.js";

import { sendResponse } from "../utils/responseHandler.js";

// Obtener todos los productos
export const getProductsController = async (req, res, next) => {
  try {
    const products = await getProductsService();
    sendResponse(res, products, "Productos encontrados");
  } catch (err) {
    next(err);
  }
};

// Obtener un producto por ID
export const getProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductService(id);

    if (!product) {
      return sendResponse(res, null, "Producto no encontrado", false, 404);
    }

    sendResponse(res, product, "Producto encontrado");
  } catch (err) {
    next(err);
  }
};

// Crear producto
export const createProductController = async (req, res, next) => {
  try {
    const newProduct = await createProductService(req.body);
    sendResponse(res, newProduct, "Producto creado correctamente", true, 201);
  } catch (err) {
    next(err);
  }
};

// Actualizar producto
export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateProductService(id, req.body);

    if (!updated) {
      return sendResponse(
        res,
        null,
        "Producto no encontrado o sin cambios",
        false,
        404,
      );
    }
    const updatedProduct = await getProductService(id);

    sendResponse(res, updatedProduct, "Producto actualizado");
  } catch (err) {
    next(err);
  }
};

// Activar producto (soft delete)
export const activateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const activated = await activateProductService(id);

    if (!activated) {
      return sendResponse(res, null, "Producto no encontrado  o Producto ya activado", false, 404);
    }

    sendResponse(res, null, "Producto activado");
  } catch (err) {
    next(err);
  }
};
// Eliminar producto (soft delete)
export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProductService(id);

    if (!deleted) {
      return sendResponse(res, null, "Producto no encontrado", false, 404);
    }

    sendResponse(res, null, "Producto eliminado");
  } catch (err) {
    next(err);
  }
};


