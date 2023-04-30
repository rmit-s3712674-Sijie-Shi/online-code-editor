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
            <div className="cardSection">
                Question: <br></br>
                {title}
            </div>
            <div className="cardSection">
                Description: <br></br>
                {detail}
            </div>
            <div className="cardSection">
                Hint:<br></br>
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