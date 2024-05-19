import { useState } from 'react';
import AuthForm from '../AuthForm';

const CreateAccount = () => {
    const api = process.env.REACT_APP_API_URL;
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      const createAccountUserData = {
        username,
        password,
      };
  
      await fetch(`${api}/create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createAccountUserData),
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
        
        alert('Account has been created. Please sign in.');
        window.location.href = '/sign-in';
      })
      .catch(error => {
        console.error('Error creating an account:', error);
      });
    }
  
    return (
      <AuthForm
        label="Create Account"
        path="/sign-in"
        footnote="Already have an account? Sign in "
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    );
  }

  export default CreateAccount;