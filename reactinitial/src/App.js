import React, { useState, useEffect } from 'react';
import LoadingMask from '../src/components/LoadingMask';
import Character from './components/Character';
import Subscription from './components/Subscription';

const Api = 'https://demoapi.com/api/series/howimetyourmother'

const App = () => {
  
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Api);
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
        setTimeout(() => {
          setShowSubscription(true);
        }, 10000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Series Api</h1>
      {loading ? <LoadingMask /> : (
        <div>
          {characters.map((character, index) => (
            <Character key={index} character={character} />
          ))}
        </div>
      )}
      {showSubscription && (
        <Subscription />
      )}
    </div>
  );
};

export default App;
