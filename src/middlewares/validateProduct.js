import { getProductService } from "../services/productos.services.js";

export const validateProductExists = async (req, res, next) => {
  try {
    const product = await getProductService(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};
