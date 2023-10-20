import { IJob } from '../types/job'
import { model, Schema } from 'mongoose'

const jobSchema: Schema = new Schema({
    jobInfo: {
        type: Object,
        required: true,
    },
    paymentFee: {
        type: Number,
        required: true,
    },
    paymentFrequency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    bids: {
        type: Array,
        required: true,
    },
    postedDate: {
        type: String,
        required: true,
    },
    activeDate: {
        type: String,
        required: true,
    },
    completedDate: {
        type: String,
        required: true,
    },
    chosenFreelancer: {
        type: String,
        required: true,
    },
})

export default model<IJob>('Job', jobSchema)
