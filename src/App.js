import React, { useEffect } from 'react';
import './App.css';
import { getToken, getRandomQues } from './CodeEditor/service';
import Container from './Container/container';

function App() {
  //get token for api
  useEffect(() => {
    getToken()
}, [])

  return (
    <div className='mainContainer'>
    <Container></Container>
    </div>
  );
}

export default App;
