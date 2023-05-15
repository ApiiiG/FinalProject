import React, {useState, useEffect, useContext} from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
              console.log(res);
              setPost(res.data);
          } catch(err) {
              console.log(err);
          }
      }
      fetchData()
  },[postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch(err) {
        console.log(err);
    }
  }

  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className='single'>
      <div className="content">
        
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="user_icon" />}
          <div className="info">
            <span>{post.username}</span>
            <p>{moment(post.date).fromNow()}</p>
          </div>
          { currentUser.username === post.username &&         
          (<div className="edit">
            <Link to={'/write-post/' + post.id} state={post}>
              <img src="https://cdn-icons-png.flaticon.com/512/1827/1827951.png" alt="edit icon" />
            </Link>
            <Link>
              <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="delete icon" />
            </Link>
          </div>)}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      {/* dodamo kategoriju i ovisno o kategoriji selectanog posta, ispisemo recommended  */}
   
    </div>
  )
}

export default Single