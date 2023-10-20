import { IBid } from '../types/job'
import { model, Schema } from 'mongoose'

const bidSchema: Schema = new Schema({
    freelancerId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

export default model<IBid>('Bid', bidSchema)
