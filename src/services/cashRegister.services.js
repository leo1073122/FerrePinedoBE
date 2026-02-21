import { pool } from "../db.js";

export const getCashRegisterServices = async (id_caja) => {
  const [result] = await pool.query("SELECT * FROM CAJA WHERE id_caja = ?", [
    id_caja,
  ]);
  return result[0];
};

export const getActiveCashServices = async () => {
  // Esta consulta busca la caja abierta y, al mismo tiempo,
  // suma las ventas y los gastos de las otras tablas.
  const query = `
    SELECT 
      c.*,
      (SELECT COALESCE(SUM(total), 0) 
       FROM ventas 
       WHERE id_caja = c.id_caja) AS total_ventas,
      (SELECT COALESCE(SUM(monto), 0) 
       FROM gastos 
       WHERE id_caja = c.id_caja) AS total_gastos,
      (SELECT COUNT(*) 
       FROM ventas 
       WHERE id_caja = c.id_caja) AS total_transacciones
    FROM caja c
    WHERE c.estado = 'ABIERTA'
    ORDER BY c.fecha_apertura DESC
    LIMIT 1
  `;

  const [result] = await pool.query(query);

  return result[0];
};

export const openCashRegisterServices = async (data) => {
  const { monto_inicial } = data;
  const [result] = await pool.query(
    `INSERT INTO CAJA (fecha_apertura, monto_inicial, estado)
   VALUES (NOW(), ?, 'ABIERTA')`,
    [monto_inicial],
  );

  return result.insertId;
};

export const closeCashRegisterServices = async (id_caja, monto_real) => {
  const [caja] = await pool.query("SELECT estado FROM CAJA WHERE id_caja = ?", [
    id_caja,
  ]);

  if (!caja.length) {
    throw { status: 404, message: "Caja no encontrada" };
  }

  if (caja[0].estado !== "ABIERTA") {
    throw { status: 400, message: "La caja ya está cerrada o no está abierta" };
  }

  const [res] = await pool.query(
    "UPDATE CAJA SET estado = 'CERRADA', fecha_cierre = NOW(), monto_real = ? WHERE id_caja = ?",
    [monto_real, id_caja],
  );
  return res.affectedRows;
};
