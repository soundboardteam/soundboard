import { Schema, model } from 'mongoose'
import { IJobInfo } from '../types/job'

const jobInfoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    urgentStatus: {
        type: String,
        required: true,
    },
})

export default model<IJobInfo>('JobInfo', jobInfoSchema)
