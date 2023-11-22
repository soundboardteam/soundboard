import React from 'react'
import { Button, ToggleButton, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authContainer } from '../signin/styles'
import CSS from 'csstype'
import { useBgColor, useColor, useSxColor, useTextColor } from '../../App'
import GradientButton from '../core-components/GradientButton'

interface HomeProps {
    toggleTheme: () => void
}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate()
    const purpleSx = useSxColor('purple')
    const cyanSx = useSxColor('cyan')
    const backgroundColor = useBgColor()
    const textColor = useTextColor()
    const toggleTheme = props.toggleTheme

    const loginButton: CSS.Properties = {
        width: '100%',
        marginBottom: '16px',
        marginTop: '32px',
    }
    const signupButton: CSS.Properties = {
        width: '100%',
        marginBottom: '16px',
        marginTop: '32px',
    }

    const homeContainer: CSS.Properties = {
        ...authContainer,
        background: backgroundColor,
    }

    console.log('BACKGROUND', backgroundColor)

    return (
        <div style={{ background: backgroundColor }}>
            <div style={homeContainer}>
                <div
                    style={{ position: 'absolute', right: '20px', top: '20px' }}
                >
                    <ToggleButton value="check" onChange={toggleTheme}>
                        Toggle Theme
                    </ToggleButton>
                </div>
                <h1>SoundBoard</h1>
                <div style={loginButton}>
                    <GradientButton
                        // sx={{ ...purpleSx, color: textColor }}
                        variant="contained"
                        onClick={() => navigate('/login')}
                        width={'100%'}
                        height={'64px'}
                    >
                        Login
                    </GradientButton>
                </div>
                <div style={signupButton}>
                    <GradientButton
                        // sx={{ ...cyanSx, color: textColor }}
                        variant="contained"
                        onClick={() => navigate('/signup')}
                        width={'100%'}
                        height={'64px'}
                    >
                        Signup
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}

export default Home
