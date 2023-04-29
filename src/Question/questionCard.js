import React from "react";
import { useState } from "react";

const QuestionCard = ({ id, title, detail, hint, result, changeQuestion, handleBack }) => {

    const [show, setShow] = useState(false)

    const clickTask = () => {
        changeQuestion(id, title)
        setShow(true)
    }

    const back = () => {
        handleBack()
        setShow(false)
    }

    return (
        <>
        {show? 
        <div id={id} className="card">
            <div className="left" onClick={back}>
                 &lt;back
            </div>
            <div >
                Question:
                {title}
            </div>
            <div>
                Description: 
                {detail}
            </div>
            <div>
                Hint:
                {hint}
            </div>
        </div> 
        :             
        <div id={id} className="card hover" onClick={clickTask}>
                <div >
                    {title}
                </div>
            </div>}

        </>

    )
}


export default QuestionCard;