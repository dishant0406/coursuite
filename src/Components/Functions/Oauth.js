import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase/firebase.config'

const onGoggleClick = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      })
    }
    console.log('done')
  }
  catch (err) {
    console.log(err.message)
  }
}

export default onGoggleClick