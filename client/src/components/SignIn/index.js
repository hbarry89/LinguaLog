import { useState } from 'react';
import AuthForm from '../AuthForm';
import { useSignIn } from '../../utils/auth.js';

const SignIn = ({ alertTip }) => {
    const api = process.env.REACT_APP_API_URL;
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
  
    const signIn = useSignIn();
  
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
        if (data.message && data.message.includes('Incorrect')) {
          setAlertMessage('Incorrect username or password.');
          setAlertVariant('danger');
          return;
        }
        
        signIn(data.token);
      })
      .catch(error => {
        console.error('Error signing in:', error);
        setAlertMessage('An error occurred. Please try again later.');
        setAlertVariant('danger');
      });
    }
  
    return (
      <AuthForm
        label="Sign In"
        path="/create-account"
        footnote="Need an account? Create an account"
        alertTip={alertTip}
        alertMessage={alertMessage}
        alertVariant={alertVariant}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    );
  }

export default SignIn;