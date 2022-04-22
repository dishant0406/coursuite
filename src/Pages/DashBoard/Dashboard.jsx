import React from 'react'
import './Dashboard.css'
import { collection, getDocs, where,query, orderBy, linit, startAfter, onSnapshot } from 'firebase/firestore'
import { db } from '../../Components/Firebase/firebase.config'
import Loader from '../../Components/Loader/Loader'
import {SearchAlt} from '@styled-icons/boxicons-regular'
import RepoCard from '../../Components/RepoCard/RepoCard'


const Dashboard = () => {
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchtitle, setTitle] = React.useState('')

  React.useEffect(() => {


    const fetchListing = async () =>{
      try{
        setLoading(true);
        const querySnapshot = await query(collection(db, "Repos"));
        var re = [];

        const unsubscribe = onSnapshot(querySnapshot, (snap) => {
          snap.forEach((doc) => {
            return re.push({
              id: doc.id,
              data: doc.data()
            })
          });
            setRepos(re);
          setLoading(false)
        })
        
      }
      catch(err){
        setLoading(false)
        console.log(err)
      }
    }

    fetchListing()
  
    
  }, [])

  let filterNames =repos.filter(animals => animals.data.title.toLowerCase().includes(searchtitle.toLocaleLowerCase())); 

  if(loading){
    return (<Loader/>)
  }
  
  return (
    <>
    <div className="searchcontainer">
    <div className="containerrr">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search Title.." value={searchtitle} onChange={(e)=> setTitle(e.target.value)}/>
        <button className="search-button">
          <SearchAlt/>
        </button>
      </div>
    </div>
    </div>
    <div className='repo'>
      <div className="repocontainer">
        {filterNames.map((el)=>{
          return (
            <RepoCard key={el.id} data={el.data}/>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Dashboard