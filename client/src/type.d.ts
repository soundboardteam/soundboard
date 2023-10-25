export {}

declare global {
    interface Window {
        confirmationResult: any
        recaptchaVerifier: any
    }
    interface ITodo {
        _id: string
        name: string
        description: string
        status: boolean
        createdAt?: string
        updatedAt?: string
    }

    type TodoProps = {
        todo: ITodo
    }

    type ProfileProps = {
        profile: IProfile
    }

    type ApiDataType = {
        message: string
        status: string
        todos: IProfile[]
        todo?: IProfile
    }

    interface IProfile {
        displayName: string
        fullName: string
        phoneNumber: string
        email: string
        userRoles: string[]
        verifiedAccount: boolean
        linkedAccounts: string[]
    }
}
