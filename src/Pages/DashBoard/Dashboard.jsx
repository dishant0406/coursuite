import React from 'react'
import './Dashboard.css'
import '../../Components/SideBar/SideBar.css'
import { collection,query, onSnapshot } from 'firebase/firestore'
import { db } from '../../Components/Firebase/firebase.config'
import Loader from '../../Components/Loader/Loader'
import RepoCard from '../../Components/RepoCard/RepoCard'
import CategoryIcon from '@mui/icons-material/Category';
import Paagination from '../../Components/Pagination/Pagination'
import Error from '../../Components/Error/Error'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';


const Dashboard = () => {
  const [repos, setRepos] = React.useState([]);
  const [categories,setCategory] = React.useState([{value: '', label: 'All Categories'}]);
  const [loading, setLoading] = React.useState(false);
  const [searchtitle, setTitle] = React.useState('')
  const [cat, setCat] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(8)
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  
  
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
    setCurrentPage(1)
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
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((text) => (
          <>
          <ListItem key={text.label} disablePadding>
            <ListItemButton>
              <ListItemText primary={text.label.toUpperCase()} onClick={()=>{setCat(text.value); setCurrentPage(1)}} />
            </ListItemButton>
          </ListItem>
           <Divider />
           </>
        ))}
      </List>
    </Box>
  );

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
    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', marginTop:'1rem'}}>
    <Button variant="contained" disableElevation startIcon={<CategoryIcon />} onClick={toggleDrawer("left", true)}>Filter Categories</Button>
    </div>
    <div className="searchcontainer">
    <div className="containerrr">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search Title.." value={searchtitle} onChange={handleInputChange}/>
      </div>
    </div>


    </div>
    <div className="dash">
    
    <div className='repo'>
    <Drawer
         anchor={"left"}
         open={state["left"]}
         onClose={toggleDrawer("left", false)}
         PaperProps={{
          sx: {
            backgroundColor: "#353535",
            color: "white",
            textAlign: "center"
          }
        }}
       >
         {list("left")}
       </Drawer>
    <div className="repocontwithpage">
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
      
    </div>
    </>
  )
}

export default Dashboard