import React from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";
import './container.css'

const Container = () => {
    return(
        <div className="container">
            <Question></Question>
            <CodeEditor></CodeEditor>
        </div>
    )
}

export default Container;