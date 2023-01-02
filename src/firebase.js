// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'vidjot-ff7ae.firebaseapp.com',
  projectId: 'vidjot-ff7ae',
  storageBucket: 'vidjot-ff7ae.appspot.com',
  messagingSenderId: '115756714678',
  appId: '1:115756714678:web:6dcf96e3194ef11680f417'
};


const app = initializeApp(firebaseConfig);

export default app;
