import { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const api = 'http://localhost:3001';

  const [entries, setEntries] = useState([]);

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const [editEntry, setEditEntry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // GET
    fetch(`${api}/entries`)
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.error('Error reading entries:', error));
  }, [entries]);
  
  // POST
  const createEntry = () => {
    const entryData = {
      word,
      definition
    };
    
    fetch(`${api}/entries`, {
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

  // PUT
  const updateEntry = () => {
    const updatedEntryData = {
      id: editEntry._id,
      word,
      definition
    };
    
    fetch(`${api}/entries/${editEntry._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEntryData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setShowEditForm(false);
      })
      .catch(error => console.error('Error updating this entry:', error));
  };

  // DELETE
  const deleteEntry = (id) => {  
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if (!isConfirmed) return;

    fetch(`${api}/entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error deleting this entry:', error));
  };

  // Function to open the modal for editing
  const updateForm = (entry) => {
    setWord(entry.word);
    setDefinition(entry.definition);
    setEditEntry(entry);
    setShowEditForm(true);
  };

  return (
    <>
      {entries.map(entry => {
        return (
          <div key={entry._id}>
            <h1>{entry.word}</h1>
            <p>{entry.definition}</p>
            <button onClick={() => updateForm(entry)}>Edit</button>
            <button onClick={() => deleteEntry(entry._id)}>Delete</button>
          </div>
        );
      })}

      {/* Create Form */}
      <div>
        <input type="text" placeholder="Word" onChange={e => setWord(e.target.value)}/>
        <input type="textarea" placeholder="Definition" onChange={e => setDefinition(e.target.value)}/>
        <button onClick={createEntry}>Create an Entry</button>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditForm(false)}>&times;</span>
            <h2>Edit Entry</h2>
            <input type="text" value={word} onChange={e => setWord(e.target.value)}/>
            <input type="textarea" value={definition} onChange={e => setDefinition(e.target.value)}/>
            <button onClick={updateEntry}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}