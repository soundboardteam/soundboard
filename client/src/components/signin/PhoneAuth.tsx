// Import necessary Firebase modules at the top of your file
import React, { useState, useEffect } from 'react'
import { auth } from '../../config/firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import Button from '@mui/material/Button'
import { addProfile, verifyProfile } from '../../api'
import { TextField } from '@mui/material'
import CSS from 'csstype'

const authContainer: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    // backgroundColor: 'slategray',
    borderRadius: '16px',
    margin: '40px',
    alignItems: 'center',
}

const authTextField: CSS.Properties = {
    flex: '100%',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
}

const authButton: CSS.Properties = {
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
    border: 'white 1px solid',
}

const PhoneAuth: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [isVerifiedNumber, setIsVerifiedNumber] = useState(false)
    const [isUserNotSignedUp, setIsUserNotSignedUp] = useState(false)
    const [profile, setProfile] = useState<IProfile>()
    const [isUserSignedIn, setIsUserSignedIn] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [authentication, setAuthentication] = useState(false)

    useEffect(() => {
        if (auth.currentUser) {
            setAuthentication(true)
            auth.currentUser.getIdToken().then((token) => {
                setToken(token)
            })
        }
    })
    console.log(token)
    console.log(authentication)
    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value)
    }

    const handleVerificationCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOtp(e.target.value)
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const renderVerfifyCodePrompt = () => {
        return (
            <>
                <div style={authTextField}>
                    <TextField
                        fullWidth
                        required
                        id="filled-required"
                        label="Enter OTP"
                        value={otp}
                        onChange={handleVerificationCodeChange}
                        placeholder="Enter OTP"
                    ></TextField>
                </div>

                <div style={authButton}>
                    <Button
                        fullWidth
                        onClick={confirmVerificationCode}
                        variant={'contained'}
                    >
                        Send Verification code
                    </Button>
                </div>
            </>
        )
    }

    const renderPhoneNumberPrompt = () => {
        return (
            <>
                <div style={authTextField}>
                    <TextField
                        fullWidth
                        required
                        id="filled-required"
                        label="Enter phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter phone number (+1)"
                    ></TextField>
                </div>

                <div style={authButton}>
                    <Button
                        fullWidth
                        onClick={handleVerifyPhoneNumber}
                        variant={'contained'}
                    >
                        Submit
                    </Button>
                </div>
            </>
        )
    }

    const renderSignUpPage = () => {
        return (
            <>
                <div style={authTextField}>
                    <TextField
                        fullWidth
                        id="filled"
                        label="First name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="First name"
                    ></TextField>
                </div>
                <div style={authTextField}>
                    <TextField
                        fullWidth
                        id="filled"
                        label="Last name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Last name"
                    ></TextField>
                </div>
                <div style={authTextField}>
                    <TextField
                        fullWidth
                        id="filled"
                        label="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter email"
                    ></TextField>
                </div>

                <div style={authButton}>
                    <Button
                        fullWidth
                        onClick={handleAddProfile}
                        variant={'contained'}
                    >
                        Create Account
                    </Button>
                </div>
            </>
        )
    }

    const renderProfile = () => {
        return <h1>Welcome, {profile?.fullName}</h1>
    }

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
            size: 'invisible',
            callback: (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                console.log(response)
            },
        })
    }

    const handleAddProfile = (): void => {
        const data: IProfile = {
            displayName: '',
            fullName: firstName + ' ' + lastName,
            phoneNumber: phoneNumber,
            email: email,
            userRoles: ['test1'],
            verifiedAccount: false,
            linkedAccounts: ['yes'],
        }

        addProfile(data)
            .then(({ status, data }) => {
                if (status !== 201) {
                    throw new Error('Error! Todo not saved')
                }
                return data
            })
            .then((data) => {
                setProfile(data.profile)
                setIsUserSignedIn(true)
            })
            .catch((err) => console.log(err))
    }

    const handleVerifyPhoneNumber = async () => {
        verifyProfile(phoneNumber).then(({ status, data }) => {
            if (status === 200) {
                if (data.profile) {
                    sendCode()
                    setIsVerifiedNumber(true)
                    setProfile(data.profile)
                } else {
                    setIsUserNotSignedUp(true)
                }
            } else {
                console.log('ERR')
                setIsUserNotSignedUp(true)
            }
        })
    }

    const sendCode = async () => {
        generateRecaptcha()
        let appVerifier = window.recaptchaVerifier
        try {
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult
                })
                .catch((error) => {
                    // Error; SMS not sent
                    console.log(error)
                })
        } catch (e) {
            console.log(e)
        }
    }

    // Function to confirm the verification code
    const confirmVerificationCode = async () => {
        // verifu otp
        let confirmationResult = window.confirmationResult
        confirmationResult
            .confirm(otp)
            .then((result: any) => {
                // User signed in successfully.
                let user = result.user
                console.log(user)
                console.log('User signed in successfully')
                setIsUserSignedIn(true)
                // ...
            })
            .catch((error: any) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log('error', error)
                console.log("User couldn't sign in (bad verification code?)")
            })
    }

    return isUserSignedIn ? (
        renderProfile()
    ) : (
        <>
            <div style={authContainer} id="auth-container">
                {!isVerifiedNumber
                    ? !isUserNotSignedUp
                        ? renderPhoneNumberPrompt()
                        : renderSignUpPage()
                    : renderVerfifyCodePrompt()}
            </div>

            <div>
                <div id="recaptcha"></div>
            </div>
        </>
    )
}

export default PhoneAuth
