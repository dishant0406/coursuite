import React from 'react'
import {
  Menu,
  MenuItem,
  MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Modal from 'react-awesome-modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {DotsVerticalRounded} from '@styled-icons/boxicons-regular'
import './RepoCard.css'
import {UserContext} from '../../Context/context'

import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../Firebase/firebase.config'



const RepoCard = ({data, id}) => {
  const [modelstate, setModelState] = React.useState(false);
  const {user, setUser} = React.useContext(UserContext)

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

  const handleBtnClick = async (e)=>{
    await handleDeleteClick(e)
    await closeModal()

  }

 function openModal() {
  setModelState(true);
}

function closeModal() {
  setModelState(false)
}
  return (
    <div>
    <div>
              <Modal 
                    visible={modelstate}
                    width="250"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                  <div className="model-cont">
                <div className='model-div-cont'>
                  <h3 className='model-h3'>{`Are you sure you want to delete!`}</h3>
                  <div className="model-btn">
                  <button className='button-37' onClick={handleBtnClick}>Yes</button>
                  <button className='btn-no button-37' onClick={closeModal}>No</button>
                  </div>
                </div>
                </div>
                </Modal>
    </div>
      {/* <div className="repocard">
        <div className="repocard-header">
          <img src={data.imageUrl} alt="rover" />
        </div>
        <div className="repocard-body">
          <span className="tag tag-teal">{data.catagery}</span>
          <h4>
            {` ${data.title}`}
          </h4>
          <div className="btn-goto-a">
          <a href={link} target="_blank"><button className="button-24">Go to Project</button></a>
          <div>
          <Menu menuButton={<DotsVerticalRounded style={{color: 'black', width: '35px'}}/>} transition>
            <MenuItem onClick={openModal}>Delete Project</MenuItem>
        </Menu>
        </div>
          </div>
        </div>
      </div> */}
      <Card variant="outlined" sx={{ width: 300, backgroundColor:'#353535', color:'#FFFFFF' }}>
      <CardMedia
        component="img"
        height="145"
        image={data.imageUrl}
        alt={data.title}
      />
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.title}
        </Typography>
      </CardContent>
      <CardActions>
      <div className="btn-goto-a">
      <a href={link} target="_blank"><Button size="small" sx={{color: "white"}}>Download</Button></a>
      
      </div>
      {user.email==='dishu5570@gmail.com' && <Menu menuButton={<DotsVerticalRounded style={{color: 'white', width: '25px'}}/>} transition>
            <MenuItem onClick={openModal}>Delete Project</MenuItem>
        </Menu>}
      </CardActions>

    </Card>
      </div>

  );
}

export default RepoCard