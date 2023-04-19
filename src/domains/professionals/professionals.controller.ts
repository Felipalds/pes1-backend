import { Router, Request, Response } from "express"
import { getAllProcedures, getAllProfessionals, getProcedureById, getProfessionalById } from "../../database"



const router = Router()

router.get('/', async(req: Request, res: Response) => {
    const allProfessionals = await getAllProfessionals()
    return res.send(allProfessionals)
})

router.get('/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const professional = await getProfessionalById(id)
    return res.send(professional)
})

export default router