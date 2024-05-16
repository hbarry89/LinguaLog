import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css';

const AuthForm = ({ label, username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <div className="auth-form-container">
            <h1 className="text-center">{label}</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {label}
              </Button>

              <Form.Text className="text-muted text-center mt-3 d-block">
                {label === 'Register' ? 'Already have an account? Login here' : 'Need an account? Register here'}
              </Form.Text>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;