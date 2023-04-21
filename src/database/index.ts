import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log(process.env.DATABASE_URL);

pool.on("connect", () => {
  console.log("Database connected!");
});

// setters

const createProfessional = async (user_id: any, title: any) => {
  const client = await pool.connect();
  let check_query = `SELECT * FROM prontuaries WHERE title = '${title}'`;
  const check_res = await client.query(check_query);
  if (check_res.rows.length > 0) {
    return `Insertion Failed, title specified already exists for user with id '${user_id}'.`;
  } else {
    let json_path = `${title}_${user_id}.json`;
    let insert_query = `INSERT INTO prontuaries(user_id, title, json_path)
        VALUES(${user_id}, '${title}', '${json_path}')`;
    await client.query(insert_query);
    return "Success.";
  }
};

const deleteProfessional = async (user_id: any, table_id: any) => {
    const client = await pool.connect()
    const query = `DELETE FROM prontuaries WHERE user_id = ${user_id} AND table_id = ${table_id}`
    await client.query(query)
    return "Success."
}

// getters

const getUserById = async (
  user_id: any = "all",
  title: any = "",
  n: any = "all"
) => {
  const client = await pool.connect();
  const limit = n === "all" ? "" : `LIMIT ${n}`;
  const users = user_id === "all" ? "" : `user_id = ${user_id} AND `
  let query = `SELECT * FROM prontuaries WHERE 
                ${users} title ILIKE '%${title}%' ${limit}`;
  const query_res = await client.query(query);
  client.release();
  return query_res.rows;
};

const getAllProcedures = async () => {
    const client = await pool.connect();
    const query_res = await client.query(
        `SELECT * FROM procedures LIMIT 100`
    )
    const rows = query_res.rows
    client.release()

    return rows
}


const getProcedureById = async (procedureId: any) => {
  const client = await pool.connect();
  const res = await client.query(`
        SELECT * FROM procedures WHERE id = ${procedureId}
    `);
  return res.rows;
};

const getAllProfessionals = async () => {
  const client = await pool.connect();
  const query_res = await client.query(`SELECT * FROM professionals LIMIT 100`);
  const rows = query_res.rows;
  return rows;
}

const getAllProfessionals = async () => {
    const client = await pool.connect();
    const query_res = await client.query(
        `SELECT * FROM professionals LIMIT 100`
    )
    const rows = query_res.rows
    client.release()

    return rows
}


const getProfessionalById = async (professionalId: any) => {
  const client = await pool.connect();
  const res = await client.query(`
        SELECT * FROM professionals WHERE id = ${professionalId}
    `)
    client.release()
    return res.rows
}


export {
  getUserById,
  getAllProcedures,
  getProcedureById,
  getAllProfessionals,
  getProfessionalById,
  createProfessional,
  deleteProfessional,
};
