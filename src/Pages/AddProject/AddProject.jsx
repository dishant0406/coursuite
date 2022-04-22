import React, { useRef } from 'react'
import './AddProject.css'
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Loader from '../../Components/Loader/Loader'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { db } from '../../Components/Firebase/firebase.config'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'


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

    setLoading(false);
    toast.success('Added Successfully')
    history.push('/');

  }

  if(loading){
    return <Loader/>
  }
  
  return (

    <div className="loginwrapper">
      <h1>Add Projects</h1>
      <p>Enter Data Here!</p>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Enter Title.." value={formData.title} onChange={(e)=> setFormData((prev)=> ({...prev, title:e.target.value}))}/>
        <input type="text" placeholder="Enter Category..." value={formData.catagery} onChange={(e)=> setFormData((prev)=> ({...prev, catagery:e.target.value}))}/>
        <input type="file" accept=".jpg, .png, .jpeg, .gif" onChange={(e)=> setImages((prev)=> (e.target.files))} />
        <input type="text" placeholder="Enter File Link..." value={formData.link} onChange={(e)=> setFormData((prev)=> ({...prev, link:e.target.value}))}/>
      <button>Add Project</button>
      </form>
    </div>
  );
}

export default AddProject