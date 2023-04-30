import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";
import './container.css'
import { TourProvider, useTour } from '@reactour/tour'
import Result from "../Result/result";

const Container = () => {
    const [title, setTitle] = useState()
    const [showResult, setShowResult] = useState(false)
    const steps = [
        {
            selector: '.mainContainer',
            content: "Start your coding test."
        },
        {
            selector: '.cardContainer',
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
            <Question setTitle={setTitle} setShowResult={setShowResult} ></Question>
            <CodeEditor title={title}></CodeEditor>
            { showResult ? <Result setShowResult={setShowResult}></Result>
                        : null
            }

        </div>
        </TourProvider>
    )
}

export default Container;