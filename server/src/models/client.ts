import { IClient } from './../types/user'
import { model, Schema } from 'mongoose'

const clientSchema: Schema = new Schema({
    profileId: {
        type: String,
        required: true,
    },
    ratings: {
        type: Array,
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

export default model<IClient>('Client', clientSchema)
