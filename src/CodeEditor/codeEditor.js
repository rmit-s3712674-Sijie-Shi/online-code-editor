import React, { useCallback, useEffect, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { getToken, testCode } from "./service";

const CodeEditor = () => {
    const [codeState, setCodeState] = useState('')
    const onChange = useCallback((value, viewupdate) => {
        console.log(value)
        setCodeState(value)
    }, [])

    useEffect(() => {
        let token = getToken()
        console.log("token: " + token)
    }, [])

    const submitCode = useCallback(() => {
        testCode(codeState).then(res => console.log(res))
    }, [codeState])

    return(
        <>
            <ReactCodeMirror value="" 
            extensions={[javascript({typescript: true})]} 
            onChange={onChange} 
            placeholder={"enter your code here"}
            height="400px"
            width="500px">
            </ReactCodeMirror>
            <button onClick={() => submitCode()}>submit</button>
        </>
    )
}

export default CodeEditor;