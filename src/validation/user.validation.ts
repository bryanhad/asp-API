import { z } from 'zod'

const usernameSchema = z
    .string()
    .max(20, 'Username cannot exceed 20 characters long')
    .regex(
        /^[a-zA-Z0-9_]*$/,
        'Username cannot can only contain letters, numbers, and underscores'
    )

const emailSchema = z
    .string()
    .email('Please use valid email format')
    .min(3, 'Email is required')

const passwordSchema = z
    .string()
    .regex(/^(?!.* )/, 'Password cannot contain spaces')
    .min(5, 'Password must be atleast 5 characters long')

const roleSchema = z.string().refine(data => ['ADMIN', 'USER'].includes(data), {
    message: `User role must be either "ADMIN" or "USER"`
})

export const createAdminRequestSchema = z.object({
    body: z.object({
        username: usernameSchema.min(
            3,
            'Username must be atleast 3 characters long'
        ),
        email: emailSchema,
        password: passwordSchema
    }),
})

export type CreateAdminReqBody = z.infer<typeof createAdminRequestSchema>['body']

export const createUserRequestSchema = z.object({
    body: z.object({
        username: usernameSchema.min(
            3,
            'Username must be atleast 3 characters long'
            ),
            role: roleSchema,
            email: emailSchema,
            password: passwordSchema
        }),
    })
    
export type CreateUserReqBody = z.infer<typeof createUserRequestSchema>['body']