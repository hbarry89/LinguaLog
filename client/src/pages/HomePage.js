import SignIn from '../components/SignIn';
import { Lightbulb } from 'react-bootstrap-icons';
import './HomePage.css';

export default function HomePage({ isSignedIn }) {
  return (
    <>
      <h1 className="m-4 text-center">Welcome to LinguaLog!</h1>

      {isSignedIn ? (
        <p className="m-4 text-center">Use the navbar to navigate to the desired page.</p>
      ) : (
        <>
          <div className="alert alert-primary mx-5 p-3">
            <p className="alert-heading"><b><Lightbulb /> Test Credentials: </b></p>
            <span className="note">Feel free to use the following credentials created for your convenience to log in and test the app:</span>

            <div className="creds p-0 m-0">
              <p className=" p-0 m-0"><b>Username: </b><span>test</span></p> 
              <p className=" p-0 m-0"><b>Password: </b><span>12345678</span></p>
            </div>
          </div>

          <SignIn />
        </>
      )}
    </>
  );
}