import React from 'react'
import './Dashboard.css'
import { collection, getDocs, where,query, orderBy, linit, startAfter, onSnapshot } from 'firebase/firestore'
import { db } from '../../Components/Firebase/firebase.config'
import Loader from '../../Components/Loader/Loader'
import {SearchAlt} from '@styled-icons/boxicons-regular'
import RepoCard from '../../Components/RepoCard/RepoCard'
import Select from 'react-select';
import useStateCallback from '../../Hooks/useStateCallback'


const Dashboard = () => {
  const [repos, setRepos] = React.useState([]);
  const [categories,setCategory] = React.useState([{value: '', label: 'All Category'}]);
  const [loading, setLoading] = React.useState(false);
  const [searchtitle, setTitle] = useStateCallback('')
  const [cat, setCat] = React.useState('')

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
        })

        const querySnapshot2 = await query(collection(db, "category"));
        var res = [];

        const unsubscribe2 = onSnapshot(querySnapshot2, (snap) => {
          snap.forEach((doc) => {
            
            return res.push({ value: doc.id, label: doc.id })
          });
          setCategory((prev)=> [...prev, ...res]);
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

  const handleChange = (selectedOption) => {
    setCat(selectedOption.value)
    console.log(`Option selected:`, selectedOption);

    if(cat != ''){
      setTitle('');
    }

  }

  const handleInputChange = (e)=>{
    setTitle(
      e.target.value,
      s => {
        if(e.target.value!=''){
          setCat('')
        }
      }
      )
    
  }

  if(loading){
    return (<Loader/>)
  }
  
  let filterNames =repos.filter(animals => animals.data.catagery.toLowerCase().includes(cat.toLocaleLowerCase())); 
  filterNames =filterNames.filter(animals => animals.data.title.toLowerCase().includes(searchtitle.toLocaleLowerCase())); 

  return (
    <>
    <div className="searchcontainer">
    <div className="containerrr">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search Title.." value={searchtitle} onChange={handleInputChange}/>
        <button className="search-button">
          <SearchAlt/>
        </button>
      </div>
    </div>
    {categories!=[] && <Select options = {categories} onChange={handleChange} value = {
       categories.filter(option => 
          option.label === 'All Category')
    }/>}
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