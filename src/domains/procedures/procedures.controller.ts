import { Router, Request, Response } from "express"
import Procedures from "./procedures.service"
import fs from "fs"
import * as path from "path"
const router = Router()
const PATH = path.join(__dirname, "./procedures.json")

router.get('/', async(req: Request, res: Response) => {
    const file = fs.readFileSync(PATH)
    const allProcedures = JSON.parse(file.toString())
    return res.send(allProcedures)
})

router.post('/', async(req: Request, res: Response) => {
    const procedure = req.body
    const file = fs.readFileSync(PATH)
    const json = JSON.parse(file.toString())
    json.push(procedure)
    fs.writeFileSync(PATH, JSON.stringify(json))
    return res.status(200).json({"OK": "OK"})
})

export default router