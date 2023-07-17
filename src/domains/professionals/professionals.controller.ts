import { Router, Request, Response } from "express"
import * as path from "path"
import fs from "fs"
import Professional from "./professionals.service"
const PATH = path.join(__dirname, "./professionals.json")

const router = Router()

router.get('/', async(req: Request, res: Response) => {
    const file = fs.readFileSync(PATH)
    const allProfessionals = JSON.parse(file.toString())
    return res.send(allProfessionals)
})

router.get('/:slug', async(req: Request, res: Response) => {
    const slug = req.params.slug
    console.log(slug)
    const file = fs.readFileSync(PATH)
    const allProfessionals = JSON.parse(file.toString())
    let professional
    for(const p of allProfessionals) {
        if(p.slug === slug){
            professional = p
        }
    }
    console.log(professional)
    return res.send(professional)
})

router.post('/', async(req: Request, res: Response) => {
    try{
        const { name, description, slug } = req.body
        const professional = new Professional(name, description, slug)

        const file = fs.readFileSync(PATH)
        const json = JSON.parse(file.toString())
        json.push(professional)
        fs.writeFileSync(PATH, JSON.stringify(json))
        return res.status(200).json({"OK": "OK"})
    } catch(error){
        console.log(error)
        return res.status(500).json("error")
    }
})

export default router