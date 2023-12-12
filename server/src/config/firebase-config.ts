import { serviceAccountKey } from './serviceAccountKey'
const firebaseAdmin = require('firebase-admin')

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey),
})

export default firebaseAdmin
