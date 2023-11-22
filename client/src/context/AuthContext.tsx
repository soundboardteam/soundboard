// AuthContext.tsx
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { auth } from '../config/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<IProfile | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false) // Step 1

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
        // Token is automatically refreshed and stored by Firebase
    }

    // const signup = async (email: string, password: string) => {
    //     await createUserWithEmailAndPassword(auth, email, password)
    //     // Token is automatically refreshed and stored by Firebase
    // }

    const verifyCode = async (code: string, confirmationResult: any) => {
        await createUserWithEmailAndPassword(auth, code, confirmationResult)
    }

    const logout = async () => {
        await auth.signOut()
        setToken(null)
        setIsAuthenticated(false) // Update isAuthenticated when user logs out
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(
                user
                    ? {
                          displayName: user.displayName || '',
                          fullName: '', // Replace with the logic to derive fullName
                          phoneNumber: user.phoneNumber || '',
                          email: user.email || '',
                          userRoles: [], // Replace with actual user roles
                          verifiedAccount: user.emailVerified,
                          linkedAccounts: [], // Replace with actual linked accounts
                      }
                    : null
            )

            if (user) {
                const idToken = await user.getIdToken()
                setToken(idToken)
            }
            setIsAuthenticated(!!user) // Step 2: Update isAuthenticated based on user object
        })

        return () => unsubscribe()
    }, [])

    const value: AuthContextType = {
        user,
        isAuthenticated,
        token,
        login,
        verifyCode,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
// import React, { createContext, useState, useEffect } from 'react'
// import { auth } from '../config/firebase' // import your Firebase auth object

// interface IAuthContext {
//     currentUser: firebase.User | null
//     login: (phoneNumber: string) => Promise<void>
//     // add other methods as needed
// }

// export const AuthContext = createContext<IAuthContext | undefined>(undefined)

// export const AuthProvider: React.FC = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

//     const login = (phoneNumber: string) => {
//         const appVerifier = window.recaptchaVerifier
//         return auth
//             .signInWithPhoneNumber(phoneNumber, appVerifier)
//             .then((confirmationResult) => {
//                 // SMS sent. Prompt user to type the code from the message, then sign the
//                 // user in with confirmationResult.confirm(code).
//                 window.confirmationResult = confirmationResult
//             })
//             .catch((error) => {
//                 // Error; SMS not sent
//                 console.error(error)
//             })
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setCurrentUser(user)
//         })

//         return unsubscribe
//     }, [])

//     const value = {
//         currentUser,
//         login,
//     }

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//     return useContext(AuthContext)
// }
