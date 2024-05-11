import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Modal, Card, Form, Toast, ToastContainer } from 'react-bootstrap';
import { PlusSquare, PencilSquare, Trash } from 'react-bootstrap-icons';

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
  const [show, setShow] = useState(false);

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
        setToastMessage('Entry has been created.');
        setToastVariant('success');
        setShowAddForm(false);
        setShow(true);
      })
      .catch(error => {
        console.error('Error creating an entry:', error);
        setToastMessage('Unable to create entry. Please try again later.');
        setToastVariant('danger');
        setShow(true);
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
        setToastMessage('Entry has been updated.');
        setToastVariant('success');
        setShowEditForm(false);
        setShow(true);
      })
      .catch(error => {
        console.error('Error updating this entry:', error);
        setToastMessage('Unable to update entry. Please try again later.');
        setToastVariant('danger');
        setShow(true);
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
        setToastMessage('Entry has been deleted.');
        setToastVariant('success');
        setShow(true);
      })
      .catch(error => {
        console.error('Error deleting this entry:', error);
        setToastMessage('Unable to delete entry. Please try again later.');
        setToastVariant('danger');
        setShow(true);
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
      <Header />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Body className={`bg-${toastVariant}`}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

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