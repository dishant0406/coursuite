import React from 'react'
import './Dashboard.css'
import '../../Components/SideBar/SideBar.css'
import { collection,query, onSnapshot } from 'firebase/firestore'
import { db } from '../../Components/Firebase/firebase.config'
import Loader from '../../Components/Loader/Loader'
import RepoCard from '../../Components/RepoCard/RepoCard'
import Select from 'react-select';
import Paagination from '../../Components/Pagination/Pagination'
import Error from '../../Components/Error/Error'


const Dashboard = () => {
  const [repos, setRepos] = React.useState([]);
  const [categories,setCategory] = React.useState([{value: '', label: 'All Categories'}]);
  const [loading, setLoading] = React.useState(false);
  const [searchtitle, setTitle] = React.useState('')
  const [cat, setCat] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(6)
  
  React.useEffect(() => {


    const fetchListing = async () =>{
      try{
        setLoading(true);
        const querySnapshot = await query(collection(db, "Repos"));
        setRepos([])
        var re = [];
        var res = [];
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
        

        const unsubscribe2 = onSnapshot(querySnapshot2, (snap) => {
          snap.forEach((doc) => {
            
            return res.push({ value: doc.id, label: doc.id })
          });
          setCategory([{value: '', label: 'All Categories'}, ...res]);

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


  React.useEffect(() => {
    if(cat != ''){
      setTitle('');
    }
  }, [cat])


  

  const handleChange = (selectedOption) => {
    setCat(selectedOption.value)
  }


  const paginate = (number) => {
    setCurrentPage(number);
  }

  const handleInputChange = (e)=>{
    setTitle(e.target.value)
    if(e.target.value!=''){
      setCat('')
    }
  }

  if(loading){
    return (<Loader/>)
  }

  let filterNames =repos.filter(animals => animals.data.catagery.toLowerCase().includes(cat.toLocaleLowerCase())); 
  filterNames =filterNames.filter(animals => animals.data.title.toLowerCase().includes(searchtitle.toLocaleLowerCase())); 

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filterNames.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>
    <div className="searchcontainer">
    <div className="containerrr">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search Title.." value={searchtitle} onChange={handleInputChange}/>
      </div>
    </div>

      <div className="hidden-drp-down">
    {categories!=[] && <Select options = {categories} onChange={handleChange} value = {
       categories.filter(option => 
          option.value === cat)
    }/>}
    </div>
      


    </div>
    <div className="dash">
    
    <div className='repo'>
    <div className="sidebar">
       {categories.map((cate)=>{
        return (
          <div key={cate.label} onClick={()=>{setCat(cate.value); setCurrentPage(1)}}>{cate.label.toUpperCase()}</div>
        )
      })}
    </div>
      <div className="repocontainer">
        {currentPosts.length <1 && <Error/>}
        {currentPosts.map((el)=>{
          return (
            <RepoCard key={el.id} data={el.data} id={el.id}/>
            )
          })}
      </div>
      </div>
      <Paagination postsPerPage={postsPerPage} currentPage={currentPage} totalPosts={filterNames.length} paginate={paginate}/>
    </div>
    </>
  )
}

export default Dashboard