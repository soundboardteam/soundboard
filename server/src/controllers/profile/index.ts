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
        const {
            params: { phoneNumber },
            body,
        } = req

        const reqPhoneNumber = req.params.phoneNumber
        console.log('REQ PHONE', reqPhoneNumber)

        const profile = await Profile.find({ phoneNumber: reqPhoneNumber })
        console.log('CHECK THIS', profile)
        res.status(200).json({ profile })
    } catch (error) {
        console.log('CHECK ERROR')

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
        const allProfiles: IProfile[] = await Profile.find()

        res.status(201).json({
            message: 'Profile added',
            profile: newProfile,
            profiles: allProfiles,
        })
    } catch (error) {
        throw error
    }
}

export { getProfiles, addProfile, getProfile }
