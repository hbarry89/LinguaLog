import { Modal, Button, Form } from 'react-bootstrap';

const CreateModal = ({
  show,
  onHide,
  word,
  setWord,
  wordError,
  setWordError,
  definition,
  setDefinition,
  definitionError,
  setDefinitionError,
  createEntry,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="word">
            <Form.Label className="fw-bold">Word</Form.Label>
            <Form.Control
              type="text"
              value={word}
              onChange={e => {
                setWord(e.target.value);
                setWordError('');
              }}
              isInvalid={!!wordError}
            />
            <Form.Control.Feedback type="invalid">{wordError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="definition">
            <Form.Label className="mt-4 fw-bold">Definition</Form.Label>
            <Form.Control
              as="textarea"
              value={definition}
              onChange={e => {
                setDefinition(e.target.value);
                setDefinitionError('');
              }}
              isInvalid={!!definitionError}
            />
            <Form.Control.Feedback type="invalid">{definitionError}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={createEntry}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;