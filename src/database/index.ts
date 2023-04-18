import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

console.log(process.env.DATABASE_URL)

pool.on('connect', () => {
    console.log("Database connected!");
})

const getUserById = (user_id: any) => {
    const connect = pool.connect();
    connect.then(async (client: PoolClient) => {
        const query_res = await client.query(
            `SELECT * FROM prontuaries WHERE user_id = ${user_id}`
        );
        const rows = query_res.rows
        return rows
    })
}

const getAllProcedures = async () => {
    const client = await pool.connect();
    const query_res = await client.query(
        `SELECT * FROM procedures LIMIT 100`
    )
    const rows = query_res.rows
    return rows
}

const getProcedureById = async (procedureId: any) => {
    const client = await pool.connect()
    const res = await client.query(`
        SELECT * FROM procedures WHERE id = ${procedureId}
    `)
    return res.rows
}

const getAllProfessionals = async () => {
    const client = await pool.connect();
    const query_res = await client.query(
        `SELECT * FROM professionals LIMIT 100`
    )
    const rows = query_res.rows
    return rows
}

const getProfessionalById = async (professionalId: any) => {
    const client = await pool.connect()
    const res = await client.query(`
        SELECT * FROM professionals WHERE id = ${professionalId}
    `)
    return res.rows
}

export { getUserById, getAllProcedures, getProcedureById, getAllProfessionals, getProfessionalById }


