import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useIsSignedIn, useGetProfile, useSignOut } from '../utils/auth.js';

export default function Dashboard() {
  const api = process.env.REACT_APP_API_URL;

  const isSignedIn = useIsSignedIn();
  const getProfile = useGetProfile();
  const signOut = useSignOut();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      const profile = getProfile;
      if (profile) {
        fetch(`${api}/users/${profile.userId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to get user.');
            }
            return response.json();
          })
          .then(data => {
            setUserData(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error reading user:', error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isSignedIn, getProfile]);

  const deleteAccount = () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete your account?`);
    if (!isConfirmed) return;

    fetch(`${api}/users/${getProfile.userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: getProfile.userId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete account.');
        }
        return response.json();
      })
      .then(() => {
        signOut();
        window.location.href = '/sign-in';
      })
      .catch(error => console.error('Error deleting account:', error));
  }

  return (
    <>
      <h1 className="m-4 text-center">Dashboard</h1>
      <div className="m-4">
        <p>View your account details here.</p>
        <p><b>Signed in:</b> {isSignedIn ? 'Yes' : 'No'}</p>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          userData ? (
            <>
              <p><b>Username:</b> {userData.username}</p>
              <Button onClick={deleteAccount} variant="danger" className="btn-sm me-4">Delete Account</Button>
            </>
          ) : (
            <p>No user data available.</p>
          )
        )}
      </div>
    </>
  );
}