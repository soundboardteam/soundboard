import { Document } from 'mongoose'

export interface IBid extends Document {
    freelancerId: string
    price: number
    date: string
}

export interface IJobInfo extends Document {
    title: string
    description: string
    genre: string
    dueDate: string
    urgentStatus: boolean
}

export interface IJob extends Document {
    jobInfo: IJobInfo
    paymentFee: number
    paymentFrequency: string
    status: string
    bids: IBid[]
    postedDate: string
    activeDate: string
    completedDate: string
    chosenFreelancer: string
}
