import { Router, Request, Response } from "express";
import { readFile, readFileSync } from "fs";
import path from "path";

import { Pool, PoolClient } from "pg";
import { ProntuaryObject } from "./prontuary_class/prontuary"

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // TODO GET DADOS
  const usuario_id = 1;
  const pool = new Pool({
    connectionString:
      "postgres://postgres:OLOSISTOTAL7777777!@localhost:5432/myclinic",
  });
  const connect = pool.connect();
  connect.then(async (client: PoolClient) => {
    const query_res = await client.query(
      `SELECT * FROM prontuaries WHERE user_id = ${usuario_id}`
    );
    // console.log(query_res.rows);
    let e = {json_path: "hey"}
    res.send(query_res.rows);
    query_res.rows.forEach((value : ProntuaryObject, index) => {
      console.log(value.json_path)
    })
    client.release();
  });
  // const pront_path = path.join(__dirname, "prontuary_template.json")
  // readFile(pront_path, "utf-8", (err, data) => {
  //   if (err != null) throw err

  //   return res.send(data)
  // })
});

export default router;
