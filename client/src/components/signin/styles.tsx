import CSS from 'csstype'

export const authContainer: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    // backgroundColor: 'slategray',
    borderRadius: '16px',
    margin: '40px',
    alignItems: 'center',
}

export const authTextField: CSS.Properties = {
    flex: '100%',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
}

export const authButton: CSS.Properties = {
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
    border: 'white 1px solid',
}
