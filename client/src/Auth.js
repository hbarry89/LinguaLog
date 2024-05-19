import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage.js';
import CreateAccountPage from './pages/CreateAccountPage.js';
import SignInPage from './pages/SignInPage.js';
import Dashboard from './pages/Dashboard.js';
import Dictionary from './pages/Dictionary.js';

const Auth = () => {
  const [cookies, setCookies] = useCookies('access_token');

  const isSignedIn = !!cookies.access_token;

  const handleLogout = function() {
    const isConfirmed = window.confirm(`Are you sure you want to logout?`);
    if (!isConfirmed) return;

    setCookies('access_token', '');
    window.localStorage.removeItem("userId")
    window.location.href = '/';
  }

  return (
    <>
      <Header isSignedIn={isSignedIn} handleLogout={handleLogout}/>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage isSignedIn={isSignedIn} />} />
        {isSignedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </>
        ) : (
          <>
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </>
        )}
        </Routes>
      </Router>
    </>
  );
};

export default Auth;