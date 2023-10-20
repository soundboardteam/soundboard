import { Document } from 'mongoose'
import { IRating } from './rating'
import { IJob } from './job'

export interface IBio extends Document {
    roleId: string
    socials: string[]
    description: string
}

export interface IProfile extends Document {
    displayName: string
    fullName: string
    phoneNumber: string
    email: string
    userRoles: string[]
    verifiedAccount: boolean
    linkedAccounts: string[]
}

export interface IClient extends Document {
    profileId: string
    ratings: IRating[]
    jobs: IJob[]
    previousClients: string[]
}

export interface IFreelancer extends Document {
    profileId: string
    ratings: IRating[]
    bio: IBio
    jobs: IJob[]
    previousClients: string[]
}
