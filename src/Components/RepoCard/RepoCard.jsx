import React from 'react'
import './RepoCard.css'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../Firebase/firebase.config'
const RepoCard = ({data, id}) => {
  let link = '';
  if(data.link.includes('https://')){
    link = data.link
  }
  else{
    link = `https://${data.link}`
  }
  const handleDeleteClick = async (e)=>{
    e.preventDefault();
    await deleteDoc(doc(db, "Repos", id));
    
    window.location.reload(false);
  }
  return (
      <div className="repocard">
        <div className="repocard-header">
          <img src={data.imageUrl} alt="rover" />
          {/* <LazyLoadImage
              alt='rover'
              effect="blur"
              src={data.imageUrl} /> */}
        </div>
        <div className="repocard-body">
          <span className="tag tag-teal">{data.catagery}</span>
          <h4>
            {` ${data.title}`}
          </h4>
          <div className="btn-goto-a">
          <a href={link} target="_blank"><button className="button-24">Go to Project</button></a>
          <button className="button-24" onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      </div>

  );
}

export default RepoCard