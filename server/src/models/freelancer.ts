import { IFreelancer } from '../types/user'
import { model, Schema } from 'mongoose'

const freelancerSchema: Schema = new Schema({
    profileId: {
        type: String,
        required: true,
    },
    ratings: {
        type: Array,
        required: true,
    },
    bio: {
        type: Object,
        required: true,
    },
    jobs: {
        type: Array,
        required: true,
    },
    previousClients: {
        type: Array,
        required: true,
    },
})

export default model<IFreelancer>('Freelancer', freelancerSchema)
