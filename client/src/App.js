import { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const api = 'http://localhost:3001';

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`${api}/users`)
      .then(response => response.json())
      .then(data => setUsers(data));
  }, [users]);
  
  const createUser = () => {
    if (!name.trim()) {
      console.error('Name cannot be empty');
      return;
    }

    const userData = {
      name
    };
    
    fetch(`${api}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <>
      {users.map(user => {
        return (
          <div key={user._id}>
            <h1>{user.name}</h1>
          </div>
        );
      })}

      <div>
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
        <button onClick={createUser}>Create User</button>
      </div>
    </>
  );
}