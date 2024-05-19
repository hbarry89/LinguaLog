import { useState } from 'react';
import { useCookies } from 'react-cookie';
import AuthForm from '../AuthForm';

const SignIn = () => {
    const api = process.env.REACT_APP_API_URL;
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [_, setCookie] = useCookies(['access_token']);
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      const signInUserData = {
        username,
        password,
      };
  
      await fetch(`${api}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInUserData),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message && data.message.includes('Incorrect')) {
          alert('Incorrect username or password.');
          return;
        }
        
        setCookie("access_token", data.token);
        window.localStorage.setItem("userId", data.userId);
        console.log('Sign in successful.');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
    }
  
    return (
      <AuthForm
        label="Sign In"
        path="/create-account"
        message="Need an account? Create an account"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    );
  }

export default SignIn;