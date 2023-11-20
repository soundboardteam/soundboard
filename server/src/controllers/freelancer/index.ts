import { Response, Request } from 'express'
import { IFreelancer } from './../../types/user'
import Freelander from '../../models/freelancer'
import { getProfile } from '../profile'

const getFreelancers = async (req: Request, res: Response): Promise<void> => {
    try {
        const freelancer: IFreelancer[] = await Profile.find()
        res.status(200).json({ profiles })
    } catch (error) {
        throw error
    }
}

const getFreelancer = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { phoneNumber },
            body,
        } = req

        const reqPhoneNumber = req.params.phoneNumber
        console.log('REQ PHONE', reqPhoneNumber)

        const profile = await Profile.find({ phoneNumber: reqPhoneNumber })
        console.log('CHECK THIS', profile)
        res.status(200).json({ profile })
        console.log(req.headers)
    } catch (error) {
        console.log('CHECK ERROR')

        res.status(500).json({ error: 'Cannot find profile' })
    }
}

const addFreelancer = async (req: Request, res: Response): Promise<void> => {
    console.log('REQUEST BODY', req.body)
    try {
        const body = req.body as Pick<
            IFreelancer,
            'profileId' | 'ratings' | 'bio' | 'jobs' | 'previousClients'
        >

        const freelancer: IFreelancer = new Freelancer({
            profileId: body.displayName,
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            userRoles: body.userRoles,
            verifiedAccount: body.verifiedAccount,
            linkedAccounts: body.linkedAccounts,
        })

        const newFreelancer: IFreelancer = await freelancer.save()
        const allFreelancers: IFreelancer[] = await Freelancer.find()

        res.status(201).json({
            message: 'Freelancer added',
            freelancer: newFreelancer,
            freelancers: allFreelancers,
        })
    } catch (error) {
        throw error
    }
}

export { getProfiles, addProfile, getProfile }
