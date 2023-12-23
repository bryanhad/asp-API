import { InferSchemaType, Schema, model } from "mongoose";

const positionSchema = new Schema(
    {
        name: {type:String, required:true, unique:true}
    },
    {timestamps: true}
)

type Position = InferSchemaType<typeof positionSchema>

export default model<Position>('Position', positionSchema)