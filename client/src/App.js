import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoSVG from './logo.svg';
import { Container, Nav, Navbar, Button, Modal, Card, Form } from 'react-bootstrap';
import { PlusSquare, PencilSquare, Trash } from 'react-bootstrap-icons';

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

        console.log('Entry created successfully:', data);
        setShowAddForm(false);
      })
      .catch(error => console.error('Error creating an entry:', error));
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
        
        console.log(data);
        setShowEditForm(false);
      })
      .catch(error => console.error('Error updating this entry:', error));
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
      .then(data => console.log(data))
      .catch(error => console.error('Error deleting this entry:', error));
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
      <Navbar expand="lg" className="navbar px-4">
        <Navbar.Brand href="/">
          <img src={LogoSVG} width="30" height="30" className="d-inline-block align-top me-2" alt="LinguaLog logo" />
          LinguaLog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://github.com/hbarry89/LinguaLog" target="">GitHub</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-end">
          <Button onClick={createForm} variant="link" className="my-2 mx-0 p-0 text-primary fs-2"><PlusSquare /></Button>
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

        <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add an Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="word">
                <Form.Label><b>Word</b></Form.Label>
                <Form.Control type="text" value={word} onChange={e => { setWord(e.target.value); setWordError(''); }} isInvalid={!!wordError} />
                <Form.Control.Feedback type="invalid">{wordError}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="definition">
                <Form.Label><b>Definition</b></Form.Label>
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
                <Form.Label><b>Word</b></Form.Label>
                <Form.Control type="text" value={word} onChange={e => { setWord(e.target.value); setWordError(''); }} isInvalid={!!wordError} />
                <Form.Control.Feedback type="invalid">{wordError}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="definition">
                <Form.Label><b>Definition</b></Form.Label>
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
      </Container>
    </>
  );
}
