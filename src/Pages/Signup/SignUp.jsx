import React from 'react'
import './SignUp.css'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../../Components/Firebase/firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import google from '../../Assets/google.png'
import { UserContext } from '../../Context/context'
import onGoggleClick from '../../Components/Functions/Oauth'

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [username, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const {setUser} = React.useContext(UserContext);

  const emptyField = ()=>{
    setPassword('');
    setEmail('');
    setName('');
  }
  
  const onnSubmit = async (e)=>{
    e.preventDefault();

    try{
      if(email.includes('@yellomonkey.com')){
        const auth = getAuth();
      
      setLoading(true);

      const userCreadential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCreadential.user;

      updateProfile(auth.currentUser, {displayName: username})

      const formDataCopy = {username, email}
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      setLoading(false);
      
      setUser(user);
      
      toast.success('SignUp Successfully!')

      emptyField();
      }
      else{
        setLoading(false);
        toast.error('Enter YelloMonkey Email!')
        setEmail('')
      }

    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (

    <div className="loginwrapper">
      <h1>Hi.. Let's Start!</h1>
      <p>Register Here!</p>
      <form onSubmit={onnSubmit}>
        <input type="text" placeholder="*Enter Username..." required value={username} onChange={e=> setName(e.target.value)}/>
        <input type="text" placeholder="*Enter Email..." required value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder="*Password...(At least 6 characters)" required value={password} onChange={e=> setPassword(e.target.value)} />
      <button>{!loading? `Sign Up` : 'Loading..'} </button>
      </form>
      <div className="not-member">
        Already a member? <Link to='/signin'>Login Now</Link>
      </div>
      <div className="not-member">
        <a onClick={onGoggleClick}><img src={google}/></a>
      </div>
    </div>
  );
}

export default SignUp