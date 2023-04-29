import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { getToken, testCode } from "./service";
import "./codeEditor.css"

const CodeEditor = ({title}) => {
    const [codeState, setCodeState] = useState('')
    const [result, setResult] = useState('')
    const [disableButton, setDisableButton] = useState()
    const savedCallBack = useRef()
    
    useEffect(() => {
        title ? setDisableButton(false) : setDisableButton(true)
    }, [title])

    useEffect(() => {
        savedCallBack.current = saveCode
    })

    useEffect(() => {
        function tick() {
            savedCallBack.current()
        }
        let id = setInterval(tick, 10000);
        return () => clearInterval(id)
    },[])

    const onChange = useCallback((value, viewupdate) => {
        console.log(value)
        setCodeState(value)
    }, [])

    const submitCode = useCallback(() => {
        setDisableButton(true)
        testCode(codeState)
        .then(res => {
            setResult(res.output)
        })
        .then(() => setDisableButton(false))
    }, [codeState])

    const saveCode = () => {
        if(title && codeState)
        console.log('saving...')
        sessionStorage.setItem(`${title}`, codeState)
    }

    return (
        <div className="editorContainer">
            <div>{title ? title : "Choose a question on the left" }</div>
            <ReactCodeMirror value=""
                extensions={[javascript({ typescript: true })]}
                onChange={onChange}
                placeholder={"enter your code here"}
                height="500px"
                width="700px"
            >
            </ReactCodeMirror>
            <div className="buttonContainer">
            <button className="saveButton" onClick={() => saveCode()} disabled={disableButton}>Save</button>
            <button className="submitButton" onClick={() => submitCode()} disabled={disableButton}>Test</button>
            </div>
            <div>
                {result ? "Your result: " + result : "Your result: "}
            </div>
        </div>
    )
}

export default CodeEditor;