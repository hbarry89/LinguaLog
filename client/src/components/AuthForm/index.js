import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap';
import './style.css';

const AuthForm = ({ label, path, footnote, alertTip, alertMessage, alertVariant, username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <div className="auth-form-container">
            <p className="fs-4 fw-bold text-center">{label}</p>
            {alertTip && <>{alertTip}</>}
            {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {label}
              </Button>

              <Form.Text className="text-muted text-center d-block mt-4">
                <p>{footnote} <a href={path}>here</a></p>
              </Form.Text>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;