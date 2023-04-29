import React, { useState } from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";
import './container.css'

const Container = () => {
    const [title, setTitle] = useState()
    return(
        <div className="container">
            <Question setTitle={setTitle}></Question>
            <CodeEditor title={title}></CodeEditor>
        </div>
    )
}

export default Container;