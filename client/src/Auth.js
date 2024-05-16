import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';
import App from './App';

const Auth = () => {
  const [cookies, setCookies] = useCookies('access_token');
  const removeCookies = function() {
    setCookies('access_token', '');
    window.localStorage.removeItem("userId")
    window.location.reload(false);
  }

  return (
    <>
    <App />
      {/* {
        cookies.access_token
        ? <Button variant="danger" onClick={removeCookies}>Logout</Button> 
        
        : (
            <>
              <Register />
              <Login />
            </>
          )
      } */}
    </>
  )
}

const Register = () => {
  const api = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const registerUserData = {
      username,
      password,
    };

    await fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerUserData),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message && data.message.includes('length')) {
        alert('Username must be 3 or more characters.');
        return;
      }
      
      if (data.message && (data.message.includes('duplicate') || data.message.includes('dup'))) {
        alert('Username already exists.');
        return;
      }
      
      alert('Account has been created.');
    })
    .catch(error => {
      console.error('Error creating an account:', error);
    });
  }

  return (
    <AuthForm
      label="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
}

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

const AuthForm = ({ label, username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <div>
      <h1>{label}</h1>
      <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder= "Username" id="username" value={username} onChange={e => setUsername(e.target.value)} />

              <label htmlFor="password">Password</label>
              <input type="password" placeholder= "Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

              <button type="submit">{label}</button>
            </div>
      </form>
    </div>
  );
}   

export default Auth;