import pool from "../db.js";

export const getLeads = async (queryParams) => {
  const { search, status, location, sort } = queryParams;

  let query = "SELECT * FROM leads WHERE 1=1";
  let values = [];
  let i = 1;

  if (search) {
    query += ` AND (name ILIKE $${i} OR phone ILIKE $${i})`;
    values.push(`%${search}%`);
    i++;
  }

  if (status) {
    query += ` AND status = $${i}`;
    values.push(status);
    i++;
  }

  if (location) {
    query += ` AND location = $${i}`;
    values.push(location);
    i++;
  }

  if (sort === "latest") {
    query += " ORDER BY created_at DESC";
  }

  const result = await pool.query(query, values);
  return result.rows;
};

export const updateleads = async (id, status) => {
  const query = `
    UPDATE leads
    SET status = $1
    WHERE id = $2
    RETURNING *
  `;

  const values = [status, id];

  const result = await pool.query(query, values);

  return result.rows[0];
};