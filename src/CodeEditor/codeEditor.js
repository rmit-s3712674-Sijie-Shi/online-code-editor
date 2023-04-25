import React, { useCallback } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = () => {
    const onChange = useCallback((value, viewupdate) => {
        console.log(value)
    }, [])

    return(
        <>
            <ReactCodeMirror value="" 
            extensions={[javascript({typescript: true})]} 
            onChange={onChange} 
            placeholder={"enter your code here"}
            height="400px"
            width="500px">
            </ReactCodeMirror>
        </>
    )
}

export default CodeEditor;