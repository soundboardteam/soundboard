import { IBio } from './../types/user'
import { model, Schema } from 'mongoose'

const bioSchema: Schema = new Schema({
    roleId: {
        type: String,
        required: true,
    },
    socials: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export default model<IBio>('Bio', bioSchema)
