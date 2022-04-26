import React from 'react'
import './SignIn.css'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/context';
import google from '../../Assets/google.png'
import onGoggleClick from '../../Components/Functions/Oauth'

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading,setLoading] = React.useState(false);
  let history = useHistory();
  const {setUser} = React.useContext(UserContext);

  const onnSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const auth = getAuth();

      const userCreadential = await signInWithEmailAndPassword(auth, email, password);

      if(userCreadential.user){
        setLoading(false);
        toast.success('Login Successfully!')
        setUser(userCreadential.user);
        history.push("/");
      }
    }
    catch(error){
      toast.error(error.message)
      setLoading(false);
    }
  }

  return (

    <div className="loginwrapper">
      <h1>Hello Again!</h1>
      <p>Login Here!</p>
      <form onSubmit={onnSubmit}>
        <input type="text" placeholder="*Enter Email..." value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder="*Password..." value={password} onChange={e=> setPassword(e.target.value)} />
      <button>{loading ? 'Loading...': 'Sign in'}</button>
      </form>
      <div className="not-member">
        Not a member? <Link to='/signup'>Register Now</Link>
      </div>
      <div className="not-member">
        <a onClick={onGoggleClick}><img src={google}/></a>
      </div>
    </div>
  );
}

export default SignIn