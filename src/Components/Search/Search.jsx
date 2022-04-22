import React from 'react'
import {SearchAlt} from '@styled-icons/boxicons-regular'

import './Search.css';


const Search = () => {
  const [user, setUser] = React.useState('')
 
  return (
    <div className="searchcontainer">
    <div className="containerrr">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search.." value={user} onChange={(e)=> setUser(e.target.value)}/>
        <button className="search-button">
          <SearchAlt/>
        </button>
      </div>
    </div>
    </div>
  );
}

export default Search