import { Button, ButtonProps, useTheme } from '@mui/material'

interface GradientButtonProps extends ButtonProps {
    children?: React.ReactNode
    width?: string | number
    height?: string | number
}

const GradientButton: React.FC<GradientButtonProps> = ({
    children,
    ...props
}) => {
    const theme = useTheme()
    const isLightMode = theme.palette.mode === 'light'

    const lightGradient =
        'linear-gradient(112deg, rgba(255,66,117,1) 13%, rgba(255,143,66,1) 61%, rgba(255,143,66,1) 98%)'

    const darkGradient =
        'linear-gradient(112deg, rgba(150,101,255,1) 13%, rgba(129,221,211,1) 61%)'

    const sxProps = isLightMode
        ? {
              color: theme.palette.grey[800],
              background: theme.palette.whiteLight,
              boxShadow: `0 0 0 2px ${theme.palette.whiteLight}, 0 0 0 4px ${lightGradient}`,
              '&:hover': {
                  background: lightGradient,
                  color: 'white',
              },
              width: props.width,
              height: props.height,
          }
        : {
              background: darkGradient,
              color: 'white',
              '&:hover': {
                  color: theme.palette.grey[800],
                  background: theme.palette.whiteDark,
                  boxShadow: `0 0 0 2px ${theme.palette.whiteLight}, 0 0 0 4px ${darkGradient}`,
              },
              width: props.width,
              height: props.height,
          }

    return (
        <Button {...props} sx={sxProps}>
            {children}
        </Button>
    )
}

export default GradientButton
