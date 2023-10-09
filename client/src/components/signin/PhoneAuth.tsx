// Import necessary Firebase modules at the top of your file
import React, { useState } from 'react'
import { auth } from '../../config/firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'

const PhoneAuth: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    // const [confirmationResult, setConfirmationResult] = useState<any | null>(
    //     null
    // )

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
            <button onClick={handleSendCode}>Send Verification Code</button>
            <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
            />
            <button onClick={confirmVerificationCode}>Verify Code</button>
        </div>
    )
}

export default PhoneAuth
