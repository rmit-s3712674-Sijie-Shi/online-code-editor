import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";
import './container.css'
import { TourProvider, useTour } from '@reactour/tour'

const Container = () => {
    const [title, setTitle] = useState()
    const steps = [
        {
            selector: '.questionContainer',
            content: "This is your question list."
        },
        {
            selector: '.editorContainer',
            content: "After select a question, you can code in this editor."
        }
    ]

    return(
        <TourProvider steps={steps}>
        <div className="container">
            <Question setTitle={setTitle}></Question>
            <CodeEditor title={title}></CodeEditor>
        </div>
        </TourProvider>
    )
}

export default Container;