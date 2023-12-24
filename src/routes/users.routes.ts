import express from 'express'
import validateRequest from '../middlewares/validateRequest'
import { createAdminRequestSchema } from '../validation/user.validation'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

router.post(
    '/create-admin',
    validateRequest(createAdminRequestSchema),
    UserController.createAdmin
)

export { router as usersRoutes }
