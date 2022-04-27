import React from 'react'
import './Error.css'
import {Link} from 'react-router-dom'


const Error = () => {
  return (

    <div className="wrapp">
      <div className="alert alert-error radius">
        No Data is avaible to be shown! Try <Link to='/add'>Adding Projects</Link>
      </div>
    </div>
  );
}

export default Error