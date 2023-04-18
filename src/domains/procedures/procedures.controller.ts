import { Router, Request, Response } from "express"
import { getAllProcedures, getProcedureById } from "../../database"



const router = Router()

router.get('/', async(req: Request, res: Response) => {
    const allProcedures = await getAllProcedures()
    return res.send(allProcedures)
})

router.get('/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    const allProcedures = await getProcedureById(id)
    return res.send(allProcedures)
})

export default router