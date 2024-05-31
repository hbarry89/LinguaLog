import { Alert } from 'react-bootstrap';
import { Lightbulb } from 'react-bootstrap-icons';
import SignIn from '../components/SignIn';

export default function HomePage({ isSignedIn }) {
  const alertTip = (
    <>
      <Alert variant="primary">
        <Alert.Heading><Lightbulb/> Test Credentials:</Alert.Heading>
        <p style={{ fontSize: 'small' }}>
          <i>The following credentials have been created for your convenience to sign in and test the app.</i>
        </p>
        <hr />
        <div style={{ fontSize: 'smaller' }}>
          <p className="p-0 m-0"><b>Username: </b><span>test</span></p> 
          <p className="p-0 m-0"><b>Password: </b><span>12345678</span></p>
        </div>
      </Alert>
    </>
  );

  return (
    <>
      <h1 className="m-4 text-center">Welcome to LinguaLog!</h1>

      {isSignedIn ? (
        <p className="m-4 text-center">Use the navbar to navigate to the desired page.</p>
      ) : (
        <>
          <SignIn 
            alertTip={alertTip}
          />
        </>
      )}
    </>
  );
}