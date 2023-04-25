import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Classes

class Prontuary {
  private user_id : string
  private title : string

  constructor(user_id : any = "all", title : any = "all") {
    this.user_id = (user_id === "all") ? "" : `user_id = ${user_id} AND `
    this.title = (title === "all") ? "" : title
  }

  public set(user_id : any, title : any) {
    this.user_id = (user_id === "all") ? "" : `user_id = ${user_id} AND `
    this.title = (title === "all") ? "" : title
  }

  public set_user_id(user_id : any) {
    this.user_id = (user_id === "all") ? "" : `user_id = ${user_id} AND `
  }

  public set_title(title : any) {
    this.title = (title === "all") ? "" : title
  }

  public async get(n : any) {
    const client = await pool.connect()
    const limit = (n === "all") ? "" : `LIMIT ${n}`
    const query = `SELECT * FROM prontuaries 
    WHERE ${this.user_id} title ILIKE '%${this.title}%' ${limit}`
    const query_res = await client.query(query)
    client.release()
    return query_res.rows
  }

  public async create(title : any) {
    const client = await pool.connect()
    const check_query = `SELECT * FROM prontuaries 
    WHERE ${this.user_id} title = '${title}'`
    const check_res = await client.query(check_query)
    if (check_res.rows.length > 0) {
      client.release()
      return `Insertion Failed, title specified already exists for user with id '${this.user_id}".`
    } else {
      const json_path = `${this.title}_${this.user_id}.json`
      const insert_query = `INSERT INTO prontuaries(user_id, title, json_path)
      VALUES(${this.user_id.split(' ')[2]}, '${title}', '${json_path}')`
      await client.query(insert_query)
      client.release()
      return "Success."
    }
  }

  public async delete(table_id : any) {
    const client = await pool.connect()
    const query = `DELETE FROM prontuaries WHERE ${this.user_id} table_id = ${table_id}`
    await client.query(query)
    client.release()
    return "Success."
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log(process.env.DATABASE_URL);

pool.on("connect", () => {
  console.log("Database connected!");
});

const getAllProcedures = async () => {
  const client = await pool.connect();
  const query_res = await client.query(`SELECT * FROM procedures LIMIT 100`);
  const rows = query_res.rows;
  return rows;
};

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
};

const getProfessionalById = async (professionalId: any) => {
  const client = await pool.connect();
  const res = await client.query(`
        SELECT * FROM professionals WHERE id = ${professionalId}
    `);
  return res.rows;
};

export {
  getAllProcedures,
  getProcedureById,
  getAllProfessionals,
  getProfessionalById,
  Prontuary,
};
