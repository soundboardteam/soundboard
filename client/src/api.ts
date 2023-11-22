import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:4000'

// export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
//     try {
//         const todos: AxiosResponse<ApiDataType> = await axios.get(
//             baseUrl + '/todos'
//         )
//         return todos
//     } catch (error) {
//         throw error
//     }
// }

export const addProfile = async (
    formData: IProfile
): Promise<AxiosResponse<ApiProfileType>> => {
    try {
        const profile: Omit<IProfile, '_id'> = {
            displayName: formData.displayName
                ? formData.displayName
                : 'Test Candidate',
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            userRoles: formData.userRoles ? formData.userRoles : [],
            verifiedAccount: formData.verifiedAccount
                ? formData.verifiedAccount
                : false,
            linkedAccounts: formData.linkedAccounts
                ? formData.linkedAccounts
                : [],
        }
        const saveProfile: AxiosResponse<ApiProfileType> = await axios.post(
            baseUrl + '/add-profile',
            profile
        )
        return saveProfile
    } catch (error) {
        throw error
    }
}

export const verifyProfile = async (
    phoneNumber: string
): Promise<AxiosResponse<ApiProfileType>> => {
    try {
        const profile: AxiosResponse<ApiProfileType> = await axios.get(
            baseUrl + '/get-profile/' + phoneNumber
        )
        console.log('ARE WE VERIFIYING', profile)
        return profile
    } catch (error) {
        throw error
    }
}
