import { useState } from 'react';
import { useCookies } from 'react-cookie';
import AuthForm from '../AuthForm';

const Login = () => {
    const api = process.env.REACT_APP_API_URL;
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [_, setCookie] = useCookies(['access_token']);
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      const loginUserData = {
        username,
        password,
      };
  
      await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUserData),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);   
        setCookie("access_token", data.token);
        window.localStorage.setItem("userId", data.userId);
        window.location.reload(false);  
        alert('Login successful.');
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
    }
  
    return (
      <AuthForm
        label="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    );
  }

export default Login;