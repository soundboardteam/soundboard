import {
    createTheme,
    SxProps,
    Theme,
    ThemeProvider,
    useTheme,
} from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './components/home/Home'
import { Login } from './components/signin/Login'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUp } from './components/signin/SignUp'
import { CssBaseline, ToggleButton } from '@mui/material'

declare module '@mui/material/styles' {
    interface Palette {
        cyanLight?: string
        cyanDark?: string
        orangeLight?: string
        orangeDark?: string
        purpleLight?: string
        purpleDark?: string
        whiteLight?: string
        whiteDark?: string
        blackLight?: string
        blackDark?: string
        redLight?: string
        redDark?: string
    }
    interface PaletteOptions {
        cyanLight?: string
        cyanDark?: string
        orangeLight?: string
        orangeDark?: string
        purpleLight?: string
        purpleDark?: string
        whiteLight?: string
        whiteDark?: string
        blackLight?: string
        blackDark?: string
        redLight?: string
        redDark?: string
    }
}
export const useColor = (colorName: string) => {
    const theme = useTheme()
    const paletteAny: any = theme.palette
    const lightColor = paletteAny[colorName + 'Light']
    const darkColor = paletteAny[colorName + 'Dark']
    return theme.palette.mode === 'light' ? lightColor : darkColor
}

export const useSxColor = (colorName: string): SxProps<Theme> => {
    const color = useColor(colorName)
    return {
        backgroundColor: color,
        '&:hover': {
            backgroundColor: color,
        },
    }
}
export const useBgColor = () => {
    const theme = useTheme()
    return theme.palette.mode === 'light'
        ? theme.palette.whiteLight
        : theme.palette.blackDark
}

export const useTextColor = () => {
    const theme = useTheme()
    return theme.palette.mode === 'light'
        ? theme.palette.blackLight
        : theme.palette.whiteDark
}

const App: React.FC = () => {
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            cyanLight: '#81DDD3',
            orangeLight: '#FF8F42',
            purpleLight: '#9665FF',
            whiteLight: '#F5F5F5',
            blackLight: '#0E0C15',
            redLight: '#FF4275',
        },
    })

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            cyanDark: '#7BFBFD',
            orangeDark: '#FF6700',
            purpleDark: '#6F2FF5',
            whiteDark: '#F5F5F5',
            blackDark: '#0E0C15',
            redDark: '#E01A4F',
        },
    })
    const [themeMode, setThemeMode] = useState('light')

    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const bgColor = themeMode === 'light' ? '#F5F5F5' : '#0E0C15'

    useEffect(() => {
        document.body.style.backgroundColor = bgColor
    }, [bgColor])

    const theme = themeMode === 'light' ? lightTheme : darkTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home toggleTheme={toggleTheme} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Home toggleTheme={toggleTheme} />
                                </PrivateRoute>
                            }
                        />
                        {/* add more routes as needed */}
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
