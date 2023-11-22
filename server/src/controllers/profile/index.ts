import { Response, Request } from 'express'
import { IProfile } from './../../types/user'
import Profile from '../../models/profile'

const getProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const profiles: IProfile[] = await Profile.find()
        res.status(200).json({ profiles })
    } catch (error) {
        throw error
    }
}

const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const reqPhoneNumber = req.params.phoneNumber

        const profile = await Profile.find({ phoneNumber: reqPhoneNumber })
        if (profile.length === 0) {
            res.status(201).json({})
        }
        res.status(200).json(undefined)
    } catch (error) {
        res.status(500).json({ error: 'Cannot find profile' })
    }
}

const addProfile = async (req: Request, res: Response): Promise<void> => {
    console.log('REQUEST BODY', req.body)
    try {
        const body = req.body as Pick<
            IProfile,
            | 'displayName'
            | 'fullName'
            | 'phoneNumber'
            | 'email'
            | 'userRoles'
            | 'verifiedAccount'
            | 'linkedAccounts'
        >

        const profile: IProfile = new Profile({
            displayName: body.displayName,
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            userRoles: body.userRoles,
            verifiedAccount: body.verifiedAccount,
            linkedAccounts: body.linkedAccounts,
        })

        const newProfile: IProfile = await profile.save()

        res.status(201).json({
            message: 'Profile added',
            status: 201,
            profile: newProfile,
        })
    } catch (error) {
        throw error
    }
}

export { getProfiles, addProfile, getProfile }
