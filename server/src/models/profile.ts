import { IProfile } from './../types/user'
import { model, Schema } from 'mongoose'

const profileSchema: Schema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    userRoles: {
        type: Array,
        required: true,
    },
    verifiedAccount: {
        type: Boolean,
        required: true,
    },
    linkedAccounts: {
        type: Array,
        required: true,
    },
})

export default model<IProfile>('Profile', profileSchema)
