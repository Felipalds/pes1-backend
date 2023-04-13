import { Router, Request, Response } from "express"



const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.send("AAAA")
})

router.get('/:id', (req: Request, res: Response) => {
    console.log(req.params.id);
    return res.status(200)
})

router.post('/portela', (req: Request, res: Response) => {
    const data = req.body
    console.log(data);
    return res.send("Portela")
})

export default router