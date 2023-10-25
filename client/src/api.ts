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
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const profile: Omit<IProfile, '_id'> = {
            displayName: formData.displayName,
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            userRoles: formData.userRoles,
            verifiedAccount: formData.verifiedAccount,
            linkedAccounts: formData.linkedAccounts,
        }
        const saveProfile: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + '/add-profile',
            profile
        )
        return saveProfile
    } catch (error) {
        throw error
    }
}
