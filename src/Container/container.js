import React from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";

const Container = () => {
    return(
        <div>
            <Question></Question>
            <CodeEditor></CodeEditor>
        </div>
    )
}

export default Container;