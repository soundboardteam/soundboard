import { IRating } from '../types/rating'
import { model, Schema } from 'mongoose'

const ratingSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    ratingValue: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    associatedJob: {
        type: String,
        required: true,
    },
})
