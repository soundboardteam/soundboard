import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { authTextField, authButton } from './styles'

export const VerifyPrompt: React.FC = () => {
    const [otp, setOtp] = useState('')

    const handleVerificationCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOtp(e.target.value)
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
