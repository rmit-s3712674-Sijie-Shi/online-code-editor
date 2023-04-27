import React, { useEffect } from 'react';
import './App.css';
import CodeEditor from './CodeEditor/codeEditor';
import { getToken } from './CodeEditor/service';

function App() {
  useEffect(() => {
    let token = getToken()
    console.log("token: " + token)
    localStorage.setItem("editorToken", token)
}, [])

  return (
    <>
    <CodeEditor></CodeEditor>
    </>
  );
}

export default App;
