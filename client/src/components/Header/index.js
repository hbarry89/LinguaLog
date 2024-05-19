import './style.css';
import LogoSVG from '../../assets/logo.svg';
import { Nav, Navbar, Form, Button, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Header({ isSignedIn, handleLogout }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Navbar expand="lg" className="navbar px-4">
      <Navbar.Brand href="/">
        <img src={LogoSVG} width="30" height="30" className="d-inline-block align-top me-2" alt="LinguaLog logo" />
        LinguaLog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isSignedIn ? (
            <>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/Dictionary">Dictionary</Nav.Link>
            </>
          ) : (
            null
          )}
        </Nav>

        {isSignedIn ? (
          <Button onClick={handleLogout} variant="primary" className="btn-sm me-4">Logout</Button>
        ) : (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="btn-sm me-4" id="dropdown-basic">
                Account
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/sign-in">Sign In</Dropdown.Item>
                <Dropdown.Item href="/create-account">Create Account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}

        <Form>
          <Form.Check type="switch" id="theme-switch" checked={theme === 'dark'} onChange={toggleTheme} />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}