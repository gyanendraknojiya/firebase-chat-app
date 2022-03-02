import { useEffect, useState } from 'react';
import './App.css';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import firebase from './firebase.config';
import Loader from './components/loader/loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div>{isAuthenticated ? <Chat /> : <Auth />}</div>
    </>
  );
};

export default App;
