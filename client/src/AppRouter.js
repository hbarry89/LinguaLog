import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage.js';
import CreateAccountPage from './pages/CreateAccountPage.js';
import SignInPage from './pages/SignInPage.js';
import Dashboard from './pages/Dashboard.js';
import Dictionary from './pages/Dictionary.js';
import { useIsSignedIn } from './utils/auth.js';

const AppRouter = () => {
  const isSignedIn = useIsSignedIn();

  return (
    <>
      <Header />
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

export default AppRouter;