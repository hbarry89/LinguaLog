import { Nav, Navbar, Form, Button, Dropdown } from 'react-bootstrap';
import './style.css';
import LogoSVG from '../../assets/logo.svg';
import { useEffect, useState } from 'react';
import { useIsSignedIn, useSignOut } from '../../utils/auth.js';

export default function Header() {
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

  const isSignedIn = useIsSignedIn();
  const signOut = useSignOut();

  const handleSignOut = function() {
    const isConfirmed = window.confirm(`Are you sure you want to sign out?`);
    if (!isConfirmed) return;

    signOut();
  }

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
              <Nav.Link href="/dictionary">Dictionary</Nav.Link>
            </>
          ) : (
            null
          )}
        </Nav>

        {isSignedIn ? (
          <Button onClick={handleSignOut} variant="primary" className="btn-sm me-4">Sign Out</Button>
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