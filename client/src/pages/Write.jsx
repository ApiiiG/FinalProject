import React, { useState } from 'react'; //https://www.w3schools.com/react/default.asp
import ReactQuill from 'react-quill';  //https://www.npmjs.com/package/react-quill
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'; 
import moment from 'moment'; 

//Frontend za dodavanej i update posta na blogu :)
const Write = () => {

  //state koji smo poslali sa SinglePost.jsx prilikom pritiska na edit, ukoliko imamo ovaj state radimo update, u suprotnom je add new post
  const state = useLocation().state;

  //Ako je state poslan onda postavljamo vrijednosti inputa na vrijednosti posta kojeg updateamo
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || "");
 



  //funkcija koju pozivamo kada stisnemo publish, ovisno je li update ili add radimo axios upit na naš api endpoint koji smo def u serveru
  const handleSubmit = async e => {
    e.preventDefault();
   

    try {
      state ? await axios.put("http://localhost:8800/api/posts/" + state.id, {
        title: title, 
        desc:value,
        
      },{
        withCredentials : true
      }) : await axios.post("http://localhost:8800/api/posts/", {
        title: title, 
        desc:value,
       
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      },{
        withCredentials : true
      });
      window.location.href = "/"; // Redirect to home page after request is completed
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          
        
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>  
       
      </div>  
    </div>
  )
}

export default Write