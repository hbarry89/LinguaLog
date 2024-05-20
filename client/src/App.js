import { useState, useEffect } from 'react';
import { Container, Button, Card, Spinner } from 'react-bootstrap';
import { PlusSquare, PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import CustomToast from './components/CustomToast';
import './App.css';

export default function App() {
  const api = process.env.REACT_APP_API_URL;
  const [entries, setEntries] = useState([]);
  const [word, setWord] = useState('');
  const [wordError, setWordError] = useState('');
  const [definition, setDefinition] = useState('');
  const [definitionError, setDefinitionError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // GET
  useEffect(() => {
    fetch(`${api}/entries`)
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to get entries.');
      }
      return response.json();
    })
    .then(data => {
      setEntries(data);
      setLoading(false);
    })
    .catch(error => console.error('Error reading entries:', error));
}, []);

  // POST
  const createEntry = () => {
    if (!word || !definition) {
      setWordError(word ? '' : 'Please enter a word.');
      setDefinitionError(definition ? '' : 'Please enter a definition.');
      return;
    }

    const entryData = {
      word,
      definition
    };

    fetch(`${api}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to post entry.');
      }
      return response.json();
    })
    .then(data => {
      if (data.message && data.message.includes('duplicate' || 'dup')) {
        setWordError(`${word} already exists.`);
        return;
      }
      setToastMessage(`${word} has been created.`);
      setToastVariant('success');
      setEntries([...entries, data]);
      setShowAddForm(false);
      setShowToast(true);
    })
    .catch(error => {
      console.error(`Error creating an entry for ${word}:`, error);
      setToastMessage(`Unable to create an entry for ${word}. Please try again later.`);
      setToastVariant('danger');
      setShowToast(true);
    });
  };

  // PUT
  const updateEntry = () => {
    if (!word || !definition) {
      setWordError(word ? '' : 'Please enter a word.');
      setDefinitionError(definition ? '' : 'Please enter a definition.');
      return;
    }

    const updatedEntryData = {
      id: editEntry._id,
      word,
      definition
    };

    fetch(`${api}/entries/${editEntry._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEntryData),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to put entry.');
      }
      return response.json();
    })
    .then(data => {
      if (data.message && data.message.includes('duplicate' || 'dup')) {
        setWordError(`${word} already exists.`);
        return;
      }
      setToastMessage(`${word} has been updated.`);
      setToastVariant('success');
      const updatedEntries = entries.map(entry => entry._id === editEntry._id ? data : entry);
      setEntries(updatedEntries);
      setShowEditForm(false);
      setShowToast(true);
    })
    .catch(error => {
      console.error(`Error updating ${word}:`, error);
      setToastMessage(`Unable to update ${word}. Please try again later.`);
      setToastVariant('danger');
      setShowToast(true);
    });
  };

  // DELETE
  const deleteEntry = (id, word) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${word}?`);
    if (!isConfirmed) return;

    fetch(`${api}/entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to delete entry.');
      }
      return response.json();
    })
    .then(() => {
      setToastMessage(`${word} has been deleted.`);
      setToastVariant('success');
      const deletedEntries = entries.filter(entry => entry._id !== id);
      setEntries(deletedEntries);
      setShowToast(true);
    })
    .catch(error => {
      console.error(`Error deleting ${word}:`, error);
      setToastMessage(`Unable to delete ${word}. Please try again later.`);
      setToastVariant('danger');
      setShowToast(true);
    });
  };

  // Show Create Form
  const createForm = (entry = {}) => {
    setWord(entry.word || '');
    setDefinition(entry.definition || '');
    setShowAddForm(true);
  };

  // Show Update Form
  const updateForm = (entry) => {
    setWord(entry.word);
    setDefinition(entry.definition);
    setEditEntry(entry);
    setShowEditForm(true);
  };

  return (
    <>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-end">
          <Button onClick={createForm} variant="link" className="my-2 mx-0 p-0 text-primary fs-2">
            <PlusSquare />
          </Button>
          <p className="my-2 mx-0 p-0">Entries Count: <span>{entries.length}</span></p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry._id} className="card-container">
              <Card className="mb-4">
                <Card.Header>
                  <b>{entry.word}</b>
                  <Button onClick={() => deleteEntry(entry._id, entry.word)} variant="link" className="float-end text-danger py-0 pe-0 ps-2">
                    <Trash />
                  </Button>
                  <Button onClick={() => updateForm(entry)} variant="link" className="float-end text-warning p-0">
                    <PencilSquare />
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{entry.definition}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </Container>

      <CreateModal
        show={showAddForm}
        onHide={() => setShowAddForm(false)}
        word={word}
        setWord={setWord}
        wordError={wordError}
        setWordError={setWordError}
        definition={definition}
        setDefinition={setDefinition}
        definitionError={definitionError}
        setDefinitionError={setDefinitionError}
        createEntry={createEntry}
      />

      {editEntry && (
        <UpdateModal
          show={showEditForm}
          onHide={() => setShowEditForm(false)}
          entry={editEntry}
          setWord={setWord}
          word={word}
          setWordError={setWordError}
          wordError={wordError}
          setDefinition={setDefinition}
          definition={definition}
          setDefinitionError={setDefinitionError}
          definitionError={definitionError}
          updateEntry={updateEntry}
        />
      )}

      <CustomToast
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
        show={showToast}
      />
    </>
  );
}