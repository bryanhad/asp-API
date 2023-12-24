import { RequestHandler } from 'express'
import { CreateAdminReqBody, CreateUserReqBody } from '../validation/user.validation'
import userModel from '../models/user.model'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'

const createAdmin: RequestHandler<
    unknown,
    unknown,
    CreateAdminReqBody
> = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const usernameExists = await userModel
            .findOne({ username })
            .collation({ locale: 'en', strength: 2 })
            .exec()
        
        if (usernameExists) {
            throw createHttpError(409, 'Username already taken')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.create({
            username,
            email,
            password: hashedPassword,
            displayName: username,
            role: 'ADMIN',
        })

        const newAdmin = result.toObject()
        delete newAdmin.password

        req.logIn(newAdmin, (err) => {
            //login would pass the first argument, which is a user objet that has a _id key on it, and would be passed to the passport's serializeUser! it would get the session from the db, and append an Id key to the
            if (err) throw err
            res.status(201).json(newAdmin)
        }) //this req.login function is added by passport!
    } catch (err) {
        next(err)
    }
}


export class UserController {
    static createAdmin = createAdmin
}