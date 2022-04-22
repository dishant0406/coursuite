import React from 'react'
import './RepoCard.css'
const RepoCard = ({data}) => {
  let link = '';
  if(data.link.includes('https://')){
    link = data.link
  }
  else{
    link = `https://${data.link}`
  }

  return (
      <div className="repocard">
        <div className="repocard-header">
          <img src={data.imageUrl} alt="rover" />
        </div>
        <div className="repocard-body">
          <span className="tag tag-teal">{data.catagery}</span>
          <h4>
            {` ${data.title}`}
          </h4>
          <a href={link} target="_blank"><button className="button-24">Go to Project</button></a>
        </div>
      </div>

  );
}

export default RepoCard