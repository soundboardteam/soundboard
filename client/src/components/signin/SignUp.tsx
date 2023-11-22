import React, { useState } from 'react'
// import { auth } from '../../config/firebase'
import Button from '@mui/material/Button'
import { addProfile } from '../../api'
import { TextField } from '@mui/material'
import { authTextField, authContainer, authButton } from './styles'

export const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value)
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
            // .then((data) => {
            //     setProfile(data.profile)
            //     setIsUserSignedIn(true)
            // })
            .catch((err) => console.log(err))
    }

    return (
        <div style={authContainer} id="auth-container">
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
            <div style={authTextField}>
                <TextField
                    fullWidth
                    id="filled"
                    label="Enter phone number (+1)"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number (+1)"
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
        </div>
    )
}
