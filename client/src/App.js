import { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const api = 'http://localhost:3001';

  const [entries, setEntries] = useState([]);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    // GET
    fetch(`${api}/entries`)
      .then(response => response.json())
      .then(data => setEntries(data));
  }, [entries]);
  
  // POST
  const createEntry = () => {

    const entryData = {
      word,
      definition
    };
    
    fetch(`${api}/createEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error creating an entry:', error));
  };

  // DELETE
  const deleteEntry = (id) => {    
    fetch(`${api}/deleteEntry/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error deleting an entry:', error));
  };

  return (
    <>
      {entries.map(entry => {
        return (
          <div key={entry._id}>
            <h1>{entry.word}</h1>
            <p>{entry.definition}</p>
            <button onClick={() => deleteEntry(entry._id)}>Delete</button>
          </div>
        );
      })}

      <div>
        <input type="text" placeholder="Word" onChange={e => setWord(e.target.value)}/>
        <input type="textarea" placeholder="Definition" onChange={e => setDefinition(e.target.value)}/>
        <button onClick={createEntry}>Create an Entry</button>
      </div>
    </>
  );
}