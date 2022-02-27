import { useEffect, useState } from 'react';
import './App.css';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import firebase from './firebase.config';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="d-flex text-white vh-100 vw-100 justify-content-center align-items-center">Loading...</div>
  ) : (
    <div>{isAuthenticated ? <Chat /> : <Auth />}</div>
  );
}

export default App;
