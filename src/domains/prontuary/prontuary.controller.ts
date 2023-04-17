import { Router, Request, Response } from "express";
import { readFile, readFileSync } from "fs";
import path from "path";

import { Pool, PoolClient } from "pg";
import { ProntuaryObject } from "./prontuary_class/prontuary"

const pool = new Pool({
  connectionString:
    "postgres://postgres:OLOSISTOTAL7777777!@localhost:5432/myclinic",
});

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // GET USER DATA
  const user_id = req.query.user_id;
  // OPEN DATABASE CONNECTION
  const connect = pool.connect();
  // RETURN DATA
  connect.then(async (client: PoolClient) => {
    const query_res = await client.query(
      `SELECT * FROM prontuaries WHERE user_id = ${user_id}`
    );
    const rows = query_res.rows
    console.log("Rows:" + rows.length);
    res.send(rows);
    client.release();
  });
});

router.get("/create", (req : Request, res : Response) => {
  const connect = pool.connect()
  const user_id = req.query.user_id;
  const title = req.query.title; 
  connect.then(async (client : PoolClient) => {
    let i = 0
    let json_path = title + "_" + user_id + "_" + i.toString()
    while (true) {
      const check_query = await client.query(`SELECT exists (SELECT * FROM prontuaries WHERE json_path = '${json_path}')`)
      if (check_query.rows[0].exists == true) {
        i += 1
        json_path = title + "_" + user_id + "_" + i.toString()
      } else {
        break
      }
    }
    const command = `INSERT INTO prontuaries(user_id, title, json_path) 
    VALUES(${user_id}, '${title}', '${json_path}')`
    client.query(command)
    client.release()
    res.send("success!")
  })
})

router.get("/delete", (req : Request, res : Response) => {
  const connect = pool.connect()
  const table_id = req.query.table_id
  connect.then( async (client : PoolClient) => {
    client.query(`DELETE FROM prontuaries WHERE table_id = ${table_id}`)
    client.release()
    res.send("success!")
  })
})

export default router;
