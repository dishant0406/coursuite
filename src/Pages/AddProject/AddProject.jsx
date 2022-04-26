import React, { useRef } from 'react'
import './AddProject.css'
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Loader from '../../Components/Loader/Loader'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { db } from '../../Components/Firebase/firebase.config'
import {addDoc, collection, serverTimestamp, doc, getDoc, setDoc, query, onSnapshot} from 'firebase/firestore'
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

const AddProject = () => {
  const [formData, setFormData] = React.useState({
    catagery: '',
    imageUrl:'',
    link: '',
    title: ''
  })
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const auth = getAuth();
  const isMounted = useRef(true);
  const [value,setValue] = React.useState(undefined);
  const [categories,setCategory] = React.useState([]);
  React.useEffect(() => {
    if(isMounted) {
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setFormData({...formData, userRef: user.uid})
        }else{
          history.push('/signin');
        }
      })
    }
    return ()=>{
      isMounted.current = false;
    }

  }, [isMounted])

  React.useEffect(() => {


    const fetchListing = async () =>{
      try{
        setLoading(true);
        var res = [];

        const querySnapshot2 = await query(collection(db, "category"));
        
        const unsubscribe2 = onSnapshot(querySnapshot2, (snap) => {
          snap.forEach((doc) => {
            
            return res.push({ value: doc.id, label: doc.id })
          });
          setCategory([...res]);
          console.log(categories);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storeImage = async (image)=>{
      return new Promise((resolve, reject)=>{
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}`

        const storageRef = ref(storage, 'images/'+fileName)
        
        const uploadTask = uploadBytesResumable(storageRef,image)

        uploadTask.on('state_changed', (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              reject(error)
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL)
              });
            }
          );
      })
    }

    const imageURL = await Promise.all(
      [...images].map((image)=> storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error(error.message);
      return;
    })

    console.log(imageURL)


    const formDataCopy = {...formData, timestamp:serverTimestamp(), imageUrl: imageURL[0]}

    const docRef = await addDoc(collection(db, 'Repos'), formDataCopy)

    const catData = {category: formData.catagery.toLowerCase()}
    await setDoc(doc(db, "category", formData.catagery.toLowerCase()), catData);

    

    setLoading(false);
    toast.success('Added Successfully')
    history.push('/');

  }

  const handleChange = (e)=>{
     if(e !== null){
      setFormData((prev)=> ({...prev, catagery:e.value}))
      setValue(e)
     }
     if(e===null){
      setFormData((prev)=> ({...prev, catagery:''}))
     }
  }

  if(loading){
    return <Loader/>
  }
  
  return (

    <div className="loginwrapper">
      <h1>Add Project</h1>
      <p>Enter Data Here!</p>
      <form onSubmit={onSubmit}>
        <input type="text" required={true} placeholder="*Enter Title.." value={formData.title} onChange={(e)=> setFormData((prev)=> ({...prev, title:e.target.value}))}/>
        {/* <input type="text" required={true} placeholder="*Enter Category..." value={formData.catagery} onChange={(e)=> setFormData((prev)=> ({...prev, catagery:e.target.value}))}/> */}
        <div className="catdiv">
        {categories && <CreatableSelect
        isClearable
        isDisabled={loading}
        // isLoading={loading}
        onChange={handleChange}
        placeholder="Select Category(Required)"
        options={categories}
        
      />}
        </div>
        <input type="file" required={true} className="custom-file-input" accept=".jpg, .png, .jpeg, .gif" onChange={(e)=> setImages((prev)=> (e.target.files))} />
        <input type="text" required={true} placeholder="*Enter File Link..." value={formData.link} onChange={(e)=> setFormData((prev)=> ({...prev, link:e.target.value}))}/>
      <button>Add Project</button>
      </form>
    </div>
  );
}

export default AddProject