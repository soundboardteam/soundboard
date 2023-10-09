import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAtUYkPn_Itbenu4s83wMchTVACZVlKtmU',
    authDomain: 'soundboard-web-de1f2.firebaseapp.com',
    projectId: 'soundboard-web-de1f2',
    storageBucket: 'soundboard-web-de1f2.appspot.com',
    messagingSenderId: '1071531540035',
    appId: '1:1071531540035:web:480401d800129210c41ef6',
    measurementId: 'G-843GN67J2T',
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app)

export default app
