import { Document } from 'mongoose'

export interface IRating extends Document {
    userId: string
    date: string
    ratingValue: number
    description: string
    associatedJob: string
}
