import React from 'react'
import {Link} from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import './NavBar.css';
import {UserContext} from '../../Context/context'

const NavBar = () => {
  const {user, setUser} = React.useContext(UserContext)
  let auth = getAuth()

  const handleClick = async ()=>{
      await auth.signOut()
      auth = getAuth()
      setUser(null)
  }
  
  return (

    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          YML WebGl
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span />
          <span />
          <span />
        </label>
      </div>
      <div className="nav-links">
      {user && <Link to="/">Dashboard</Link>}
      {user===null && <Link to="/signup">SignUp</Link>}
      {user && <a href='#'>{user.displayName}</a>}
      {user===null && <Link to="/signin">SignIn</Link>}
      {user && <a href='#' onClick={handleClick}>Logout</a>}
      {user && <Link to="/add">Add Project</Link>}
      </div>
    </div>
  );
}

export default NavBar