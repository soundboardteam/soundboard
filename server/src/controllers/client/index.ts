import { Response, Request } from 'express'
import { IClient } from './../../types/user'
import Client from '../../models/client'
import Profile from '../../models/profile'

const getClients = async (req: Request, res: Response): Promise<void> => {
    try {
        const clients: IClient[] = await Client.find()
        res.status(200).json({ clients })
    } catch (error) {
        throw error
    }
}

const addProfile = async (req: Request, res: Response): Promise<void> => {
    console.log('REQUEST BODY', req.body)
    try {
        const body = req.body as Pick<
            IClient,
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