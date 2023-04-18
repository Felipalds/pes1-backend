import { Router, Request, Response } from "express";
import { readFile, readFileSync } from "fs";
import path from "path";

import { ProntuaryObject } from "./prontuary_class/prontuary"
import { getUserById } from "../../database";



const router = Router();

router.get("/", (req: Request, res: Response) => {
  const user_id = req.query.user_id
  const rows = getUserById(user_id)
  res.send(rows)
})

router.get("/create", (req: Request, res: Response) => {
  const user_id = req.query.user_id;
  const title = req.query.title;
  // vefrifica se ja tem se tiver retorna que ja tem
  // se nao cria
  // connect.then(async (client: PoolClient) => {
  //   let i = 0
  //   let json_path = title + "_" + user_id + "_" + i.toString()
  //   while (true) {
  //     const check_query = await client.query(`SELECT exists (SELECT * FROM prontuaries WHERE json_path = '${json_path}')`)
  //     if (check_query.rows[0].exists == true) {
  //       i += 1
  //       json_path = title + "_" + user_id + "_" + i.toString()
  //     } else {
  //       break
  //     }
  //   }
    // const command = `INSERT INTO prontuaries(user_id, title, json_path) 
    // VALUES(${user_id}, '${title}', '${json_path}')`
    // client.query(command)
    // client.release()
    // res.send("success!")
})

router.get("/delete", (req: Request, res: Response) => {
  // const connect = pool.connect()
  // const table_id = req.query.table_id
  // connect.then(async (client: PoolClient) => {
  //   client.query(`DELETE FROM prontuaries WHERE table_id = ${table_id}`)
  //   client.release()
  //   res.send("success!")
  // })
})

export default router;
