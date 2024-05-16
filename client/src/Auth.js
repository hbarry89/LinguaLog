import { useCookies } from 'react-cookie';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import App from './App';

const Auth = () => {
  const [cookies, setCookies] = useCookies('access_token');
  const handleLogout = function() {
    const isConfirmed = window.confirm(`Are you sure you want to logout?`);
    if (!isConfirmed) return;

    setCookies('access_token', '');
    window.localStorage.removeItem("userId")
    window.location.reload(false);
  }

  return (
    <>
      <Header />
      {cookies.access_token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <App />
        </>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </>
  );
};

export default Auth;