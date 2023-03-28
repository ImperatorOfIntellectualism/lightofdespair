import React, { useContext, useState } from 'react'
import '../style/login.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs).then(navigate("/"));
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Light Of Despair</h1>
          <p>
            Presented by The Imperator Of Intellectualism
          </p>
          <span>
            Don't have an account?
          </span>
          <Link to="/register"><button>Register</button></Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='Enter your name' name='username' onChange={handleChange}></input>
            <input type='password' placeholder='Enter your password' name='password' onChange={handleChange}></input>
            <button onClick={handleLogin}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

