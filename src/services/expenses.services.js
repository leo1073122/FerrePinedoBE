import { pool } from "../db.js";

export const createExpenseService = async ({ id_caja, monto, descripcion }) => {
  const [caja] = await pool.query("SELECT estado FROM CAJA WHERE id_caja = ?", [id_caja]);
  
  if (!caja.length || caja[0].estado !== 'ABIERTA') {
    throw { status: 400, message: "La caja no existe o no está abierta" };
  }

  const [result] = await pool.query(
    "INSERT INTO GASTOS (monto, descripcion, id_caja, fecha) VALUES (?, ?, ?, NOW())",
    [monto, descripcion, id_caja]
  );
  
  return { id_gasto: result.insertId, monto, descripcion, id_caja };
};

export const getExpensesService = async () => {
    const [rows] = await pool.query("SELECT * FROM GASTOS ORDER BY fecha DESC");
    return rows;
  };
