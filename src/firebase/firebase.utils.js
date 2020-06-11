import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAAPl5hJwyXFUXkkLQN1VJcg4QDwMvnfm0",
  authDomain: "crwn-db-92f79.firebaseapp.com",
  databaseURL: "https://crwn-db-92f79.firebaseio.com",
  projectId: "crwn-db-92f79",
  storageBucket: "crwn-db-92f79.appspot.com",
  messagingSenderId: "982914451415",
  appId: "1:982914451415:web:99cc8e69fbb8bd56f82d92",
  measurementId: "G-GP3RM3SG9M",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  // console.log(snapShot);

  return userRef;
};

firebase.initializeApp(config);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
