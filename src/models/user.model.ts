import { InferSchemaType, Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        username: { type: String, unique: true, sparse: true }, //sparse allows multiple users to have undefined username, even with the unique constraint
        email: { type: String, unique: true, sparse: true},
        displayName: { type: String },
        about: { type: String },
        profilePicUrl: { type: String },
        password: { type: String, select: false },
        googleId: { type: String, unique: true, sparse: true, select: false },
    },
    { timestamps: true }
)

userSchema.pre('validate', function (next) {
    if (!this.email || this.googleId) { //user must atleast have either email or googleID
        return next(
            new Error('User must have an email or social provider ID!')
        )
    }
    next()
})

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)