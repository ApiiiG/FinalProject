import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/authContext';


const Login = () => {
  //The React useState Hook allows us to track state in a function component
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  //koristi se za navigiranje, predajemo route na koji želimo otići
  const navigate = useNavigate();

  const {login}= useContext(AuthContext);

  //updateanje više inputa kroz jedan state
  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value }))
  }
  

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch(err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className='auth'>
        <div className="wrapper">
            <h1>LOGIN</h1>
            <form>
                <input type="text" name='username' placeholder='username' required onChange={handleChange}/>
                <input type="password" name="password" placeholder='password'required onChange={handleChange}/>
                <button onClick={handleSubmit}>Login</button>
                {/* ako err postoji prikaži p --> neka vrsta if u reactu */}
                {err && <p>{err}</p>}
                <span>Don't have an account <Link to="/register">Register</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Login