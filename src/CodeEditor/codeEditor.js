import React, { useCallback, useEffect, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { getToken, testCode } from "./service";
import "./codeEditor.css"

const CodeEditor = () => {
    const [codeState, setCodeState] = useState('')
    const [result, setResult] = useState('')
    const onChange = useCallback((value, viewupdate) => {
        console.log(value)
        setCodeState(value)
    }, [])

    const submitCode = useCallback(() => {
        testCode(codeState).then(res => {
            setResult(res.data.output)
        })
    }, [codeState])

    return (
        <div className="editorContainer">
            <ReactCodeMirror value=""
                extensions={[javascript({ typescript: true })]}
                onChange={onChange}
                placeholder={"enter your code here"}
                height="400px"
                width="500px"
            >
            </ReactCodeMirror>
            <div>
                {result ? "Your result: " + result : "Your result: "}
            </div>
            <button onClick={() => submitCode()}>submit</button>
        </div>
    )
}

export default CodeEditor;