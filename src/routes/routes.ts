import { Router } from 'express'

import blog from "../domains/blog/blog.controller"

const router = Router()

router.use('/blog', blog)

export default router