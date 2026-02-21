import { pool } from "../db/pool.js";

export const checkOpenCashRegister = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM caja WHERE estado = 'ABIERTA' LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "No hay caja abierta",
      });
    }

    req.caja = rows[0];

    next();
  } catch (error) {
    next(error);
  }
};
