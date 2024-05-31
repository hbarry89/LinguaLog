import { useState } from 'react';
import AuthForm from '../AuthForm';

const CreateAccount = () => {
  const api = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

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
      if (data.message && data.message.includes('characters')) {
        setAlertMessage('Password must be at least 8 characters long.');
        setAlertVariant('danger');
        return;
      }

      if (data.message && data.message.includes('length')) {
        setAlertMessage('Username must be 3 or more characters.');
        setAlertVariant('danger');
        return;
      }
      
      if (data.message && (data.message.includes('duplicate') || data.message.includes('dup'))) {
        setAlertMessage('Username already exists.');
        setAlertVariant('danger');
        return;
      }

      setAlertMessage('Account has been created. Please sign in.');
      setAlertVariant('success');
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 1000);
    })
    .catch(error => {
      console.error('Error creating an account:', error);
      setAlertMessage('An error occurred. Please try again later.');
      setAlertVariant('danger');
    });
  }

  return (
    <AuthForm
      label="Create Account"
      path="/sign-in"
      footnote="Already have an account? Sign in "
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

export default CreateAccount;