// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import firebase from '@firebase/app';
// import '@firebase/firestore';
// import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFkmvkSy3qAx7ll6wAGjaekSBq7wF-t-Q',
  authDomain: 'bar-voyage.firebaseapp.com',
  projectId: 'bar-voyage',
  storageBucket: 'bar-voyage.appspot.com',
  messagingSenderId: '849460714825',
  appId: '1:849460714825:web:86fb0b8c8c7f599a704e98',
  measurementId: 'G-NV606M8BLB',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  // eslint-disable-next-line no-unused-vars
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
// const analytics = getAnalytics(app);
