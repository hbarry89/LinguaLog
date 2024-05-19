import SignIn from '../components/SignIn';

export default function HomePage({ isSignedIn }) {
  return (
    <>
      <h1 className="m-4 text-center">Welcome to LinguaLog!</h1>

      {isSignedIn ? (
        <p className="m-4 text-center">Use the navbar to navigate to the desired page.</p>
      ) : (
        <>
          <SignIn />
        </>
      )}
    </>
  );
}
