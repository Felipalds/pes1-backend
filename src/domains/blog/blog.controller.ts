import { Router, Request, Response } from "express"

class Prontuary {
    patient_name : string
    patient_data : Map<string, string>

    constructor(patient_name : string, patient_data : Map<string, string>) {
        this.patient_name = patient_name
        this.patient_data = patient_data
    }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.send("AAAA")
})

router.get("/prontuary", (req: Request, res: Response) => {
    const isAuthenticated = false;
    if (isAuthenticated) {
        // TODO GET DADOS
    } else {
        return res.send("É necessário fazer log-in para acessar seus prontuários.")
    }
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