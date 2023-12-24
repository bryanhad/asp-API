import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { Schema, ZodError } from 'zod'

const validateRequest = (schema: Schema): RequestHandler => {
    return (req, res, next) => {
        try {
            schema.parse(req)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                next(createHttpError(400, err.message))
            } else {
                next(err)
            }
        }
    }
}

export default validateRequest
