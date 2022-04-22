import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import AddProject from './Pages/AddProject/AddProject'
import Dashboard from './Pages/DashBoard/Dashboard'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/Signup/SignUp'
import { Toaster } from 'react-hot-toast'
import Loader from './Components/Loader/Loader'

import { UserContext } from './Context/context'

const App = () => {
  const {user} = React.useContext(UserContext);

  if(user==='loading'){
    return (
      <Loader/>
    )
  }

  return (
    <BrowserRouter>
    <Toaster/>
    <NavBar/>
    <Switch>
      <Route exact path="/">
        {user===null && <Redirect to='/signin'/>}
        {user && <Dashboard/>}
      </Route>
      <Route path="/signin">
        {user===null && <SignIn/>}
        {user && <Redirect to='/'/>}
      </Route>
      <Route path="/signup">
      {user===null && <SignUp/>}
      {user && <Redirect to='/'/>}
      </Route>
      <Route path="/add">
        {user && <AddProject/>}
        {user===null && <Redirect to='/'/>}
      </Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App