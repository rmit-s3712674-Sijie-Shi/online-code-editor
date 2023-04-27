import React, { useEffect } from 'react';
import './App.css';
import CodeEditor from './CodeEditor/codeEditor';
import { getToken } from './CodeEditor/service';
import Container from './Container/container';

function App() {
  useEffect(() => {
    let token = getToken()
    console.log("token: " + token)
    localStorage.setItem("editorToken", token)
}, [])

  return (
    <>
    <Container></Container>
    </>
  );
}

export default App;
