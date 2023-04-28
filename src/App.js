import React, { useEffect } from 'react';
import './App.css';
import { getToken, getRandomQues } from './CodeEditor/service';
import Container from './Container/container';

function App() {
  useEffect(() => {
    getToken()
    let queue = getRandomQues(0,9)    
    if(!sessionStorage.getItem("queue")){
      sessionStorage.setItem("queue", queue)
    }
}, [])

  return (
    <div className='mainContainer'>
    <Container></Container>
    </div>
  );
}

export default App;
