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

export { getProfiles, addProfile }
