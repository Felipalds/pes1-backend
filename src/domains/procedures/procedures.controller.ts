import { Router, Request, Response } from "express"
import Procedure from "./procedures.service"
import fs from "fs"
import * as path from "path"
import Professional from "../professionals/professionals.service"
const router = Router()
const PATH = path.join(__dirname, "./procedures.json")

router.get('/', async(req: Request, res: Response) => {
    const file = fs.readFileSync(PATH)
    const allProcedures = JSON.parse(file.toString())
    return res.send(allProcedures)
})

router.get('/:slug', async(req: Request, res: Response) => {
    const slug = req.params.slug
    console.log(slug)
    const file = fs.readFileSync(PATH)
    const allProcedures = JSON.parse(file.toString())
    let procedure
    for(const p of allProcedures) {
        if(p.slug === slug){
            procedure = p
        }
    }
    console.log(procedure)
    return res.send(procedure)
})

router.post('/', async(req: Request, res: Response) => {
    try{
        const { name, description, slug } = req.body
        const procedure = new Procedure(name, description, slug)

        const file = fs.readFileSync(PATH)
        const json = JSON.parse(file.toString())
        json.push(procedure)
        fs.writeFileSync(PATH, JSON.stringify(json))
        
        return res.status(200).json({"OK": "OK"})
    } catch(error){
        console.log(error)
        return res.status(500).json("error")
    }
})

export default router