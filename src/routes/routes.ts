import { Router } from 'express'

import professionals from "../domains/professionals/professionals.controller"
import prontuary from "../domains/prontuary/prontuary.controller"
import procedures from "../domains/procedures/procedures.controller"
import user from '../domains/user/user.controller'

const router = Router()

router.use('/professionals', professionals)
router.use('/procedures', procedures)
router.use('/prontuary', prontuary)
router.use('/user', user)

export default router