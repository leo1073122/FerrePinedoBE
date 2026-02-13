import { pool } from "../db.js";

export const getCashRegisterServices = async (id_caja) => {
  console.log(id_caja)
  const [result] = await pool.query("SELECT * FROM CAJA WHERE id_caja = ?", [
    id_caja,
  ]);
  return result;
};

export const openCashRegisterServices = async (data) => {
  const { monto_inicial } = data;
  const [result] = await pool.query(
    `INSERT INTO caja (fecha_apertura, monto_inicial, estado)
   VALUES (NOW(), ?, 'ABIERTA')`,
  [monto_inicial]
  );

  return result.insertId;
};
