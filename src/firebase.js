import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwnq0_jjWuTckbbNMHj64Xk1mTord1xww",
  authDomain: "online-shop-mall.firebaseapp.com",
  databaseURL: "https://online-shop-mall.firebaseio.com",
  projectId: "online-shop-mall",
  storageBucket: "online-shop-mall.appspot.com",
  messagingSenderId: "384628547464",
  appId: "1:384628547464:web:a4f10006df086baa53a43d",
  measurementId: "G-KXV4VN7J6N"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

export {db, auth}