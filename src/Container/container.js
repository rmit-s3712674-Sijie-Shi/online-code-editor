import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor/codeEditor";
import Question from "../Question/question";
import './container.css'
import { TourProvider, useTour } from '@reactour/tour'
import Result from "../Result/result";
import GlobalContext from "../global-context";

const Container = () => {
    const [title, setTitle] = useState({
        title: null,
        id: null,
        testing: null
    })
    const [showResult, setShowResult] = useState(false)
    const [finished, setFinished] = useState()

    // steps for reactour
    // selector is to select the className where you want to put an indicator
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
            <GlobalContext.Provider value={[finished, setFinished]}>
        <div className="container">
            <Question setTitle={setTitle}></Question>
            <CodeEditor title={title.title} id={title.id} testing={title.testing} setShowResult={setShowResult}></CodeEditor>
            { showResult ? <Result setShowResult={setShowResult}></Result>
                        : null
            }

        </div>
        </GlobalContext.Provider>
        </TourProvider>
    )
}

export default Container;