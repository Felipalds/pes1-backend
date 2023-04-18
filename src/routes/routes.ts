import { Router } from 'express'

import professionals from "../domains/professionals/professionals.controller"
import prontuary from "../domains/prontuary/prontuary.controller"
import procedures from "../domains/procedures/procedures.controller"

const router = Router()

router.use('/professionals', professionals)
router.use('/procedures', procedures)
router.use('/prontuary', prontuary)

export default router