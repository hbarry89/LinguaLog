import './style.css';
import LogoSVG from '../../assets/logo.svg';
import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
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
          <Nav.Link href="https://github.com/hbarry89/LinguaLog" target="_blank">GitHub</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}