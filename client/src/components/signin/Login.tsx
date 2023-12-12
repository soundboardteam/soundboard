import { TextField, Button } from '@mui/material'
import { authTextField, authContainer, authButton } from './styles'
import { useState } from 'react'
import { verifyProfile } from '../../api'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import { VerifyPrompt } from './VerifyPrompt'

export const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isProfile, setIsProfile] = useState(false)

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value)
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

    const handleVerifyPhoneNumber = async () => {
        verifyProfile(phoneNumber).then(({ status, data }) => {
            if (status === 200) {
                if (data) {
                    setIsProfile(true)
                    sendCode()
                } else {
                }
            } else {
                console.log('ERR')
            }
        })
    }

    const sendCode = async () => {
        generateRecaptcha()
        console.log('SENDING CODE')
        let appVerifier = window.recaptchaVerifier
        try {
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    console.log('CONFIRMATION RESULT', confirmationResult)
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

    return (
        <div style={authContainer} id="auth-container">
            {!isProfile ? (
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
            ) : (
                <VerifyPrompt />
            )}

            <div>
                <div id="recaptcha"></div>
            </div>
        </div>
    )
}
