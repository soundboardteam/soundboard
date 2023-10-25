// Import necessary Firebase modules at the top of your file
import React, { useState } from 'react'
import { auth } from '../../config/firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import Button from '@mui/material/Button'
import { addProfile } from '../../api'

const data: IProfile = {
    displayName: 'test1',
    fullName: 'test1',
    phoneNumber: 'test1',
    email: 'test1',
    userRoles: ['test1'],
    verifiedAccount: false,
    linkedAccounts: ['yes'],
}

const handleAddProfile = (): void => {
    addProfile(data)
        .then(({ status, data }) => {
            if (status !== 201) {
                throw new Error('Error! Todo not saved')
            }
            console.log('YES', data)
        })
        .catch((err) => console.log(err))
}

const PhoneAuth: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')

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

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value)
    }

    const handleVerificationCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVerificationCode(e.target.value)
    }

    const handleSendCode = async () => {
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
            .confirm(verificationCode)
            .then((result: any) => {
                // User signed in successfully.
                let user = result.user
                console.log(user)
                console.log('User signed in successfully')
                // ...
            })
            .catch((error: any) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log('error', error)
                console.log("User couldn't sign in (bad verification code?)")
            })
    }

    return (
        <div>
            <div id="recaptcha"></div>
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
            />
            <Button onClick={handleSendCode} variant={'contained'}>
                Send Verification code
            </Button>
            {/* <button onClick={handleSendCode}>Send Verification Code</button> */}
            <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
            />
            <button onClick={confirmVerificationCode}>Verify Code</button>
            <button onClick={handleAddProfile}>TEST PROFILE ADD PLS</button>
        </div>
    )
}

export default PhoneAuth
