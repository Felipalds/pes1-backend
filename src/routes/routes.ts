import { Router } from 'express'

import blog from "../domains/blog/blog.controller"
import prontuary from "../domains/prontuary/prontuary.controller"

const router = Router()

router.use('/blog', blog)
router.use('/prontuary', prontuary)

export default router