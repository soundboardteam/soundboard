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

    type ApiProfileType = {
        profile: IProfile
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

    interface AuthContextType {
        user: IProfile | null
        isAuthenticated: boolean
        token: string | null
        login: (emailOrPhoneNumber: string, password: string) => Promise<void>
        verifyCode: (code: string, confirmationResult: any) => Promise<void>
        logout: () => Promise<void>
    }
}
