import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Modal, Card, Form, Alert } from 'react-bootstrap';
import { PlusSquare, PencilSquare, Trash, CheckCircle, ExclamationTriangle } from 'react-bootstrap-icons';

export default function App() {
  const api = 'http://localhost:3001';
  const [entries, setEntries] = useState([]);
  const [word, setWord] = useState('');
  const [wordError, setWordError] = useState('');
  const [definition, setDefinition] = useState('');
  const [definitionError, setDefinitionError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // GET
  useEffect(() => {
    fetch(`${api}/entries`)
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.error('Error reading entries:', error));
  }, [entries]);

  // POST
  const createEntry = () => {
    if (!word || !definition) {
      setWordError(word ? '' : 'Please enter a word.');
      setDefinitionError(definition ? '' : 'Please enter a definition.');
      return;
    }

    const entryData = { word, definition };
    fetch(`${api}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message && data.message.includes('duplicate' || 'dup')) {
          setWordError('This word already exists.');
          return;
        }
        setAlertMessage(' Entry has been created.');
        setAlertVariant('success');
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error creating an entry:', error);
        setAlertMessage(' Unable to create entry. Please try again later.');
        setAlertVariant('danger');
      });
  };

  // PUT
  const updateEntry = () => {
    if (!word || !definition) {
      setWordError(word ? '' : 'Please enter a word.');
      setDefinitionError(definition ? '' : 'Please enter a definition.');
      return;
    }

    const updatedEntryData = { id: editEntry._id, word, definition };
    fetch(`${api}/entries/${editEntry._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEntryData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message && data.message.includes('duplicate' || 'dup')) {
          setWordError('This word already exists.');
          return;
        }
        setAlertMessage(' Entry has been updated.');
        setAlertVariant('success');
        setShowEditForm(false);
      })
      .catch(error => {
        console.error('Error updating this entry:', error);
        setAlertMessage(' Unable to update entry. Please try again later.');
        setAlertVariant('danger');
      });
  };

  // DELETE
  const deleteEntry = (id, word) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${word}?`);
    if (!isConfirmed) return;

    fetch(`${api}/entries/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setAlertMessage(' Entry has been deleted.');
        setAlertVariant('success');
      })
      .catch(error => {
        console.error('Error deleting this entry:', error);
        setAlertMessage(' Unable to delete entry. Please try again later.');
        setAlertVariant('danger');
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

  // Clear Alert
  const clearAlert = () => {
    setAlertMessage('');
    setAlertVariant('');
  };

  // Settimeout to Clear Alert
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        clearAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      <Header />

      {alertMessage && (
        <Alert variant={alertVariant}>
          {alertVariant === 'success' ? <CheckCircle /> : <ExclamationTriangle />}
          {alertMessage}
        </Alert>
      )}

      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-end">
          <Button onClick={createForm} variant="link" className="my-2 mx-0 p-0 text-primary fs-2">
            <PlusSquare />
          </Button>
          <p className="my-2 mx-0 p-0">Entries Count: <span>{entries.length}</span></p>
        </div>

        {entries.map(entry => (
          <Card key={entry._id} className="mb-4">
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
        ))}
      </Container>

      <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="word">
              <Form.Label className="fw-bold">Word</Form.Label>
              <Form.Control type="text" value={word} onChange={e => { setWord(e.target.value); setWordError(''); }} isInvalid={!!wordError} />
              <Form.Control.Feedback type="invalid">{wordError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="definition">
              <Form.Label className="mt-4 fw-bold">Definition</Form.Label>
              <Form.Control as="textarea" value={definition} onChange={e => { setDefinition(e.target.value); setDefinitionError(''); }} isInvalid={!!definitionError} />
              <Form.Control.Feedback type="invalid">{definitionError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={createEntry}>Add</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="word">
              <Form.Label className="fw-bold">Word</Form.Label>
              <Form.Control type="text" value={word} onChange={e => { setWord(e.target.value); setWordError(''); }} isInvalid={!!wordError} />
              <Form.Control.Feedback type="invalid">{wordError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="definition">
              <Form.Label className="mt-4 fw-bold">Definition</Form.Label>
              <Form.Control as="textarea" value={definition} onChange={e => { setDefinition(e.target.value); setDefinitionError(''); }} isInvalid={!!definitionError} />
              <Form.Control.Feedback type="invalid">{definitionError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={updateEntry}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}