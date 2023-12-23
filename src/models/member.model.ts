import { InferSchemaType, Schema, model } from 'mongoose'

const memberSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    imageUrl: { type: String, required: true },
    about: { type: String },
    positionId: { type: Schema.ObjectId, ref: 'Position', required: true },
    academicHistory: { type: [String] },
    organizations: { type: [String] },
})

type Member = InferSchemaType<typeof memberSchema>

export default model<Member>('Member', memberSchema)