import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/hello/`)
      .then(response => {
        setMessage(response.data.message || 'API call successful!');
      })
      .catch(error => {
        setMessage('API call failed.');
      });
  }, []);

  return (
    <div>
      <h1>Welcome to React App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
