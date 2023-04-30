import React, { useContext, useEffect } from "react";
import { useState } from "react";
import GlobalContext from "../global-context";

const QuestionCard = ({ id, title, detail, hint, testing, changeQuestion, handleBack }) => {

    const [show, setShow] = useState(false)
    const [finished, setFinished] = useContext(GlobalContext)
    const clickTask = () => {
        changeQuestion(id, title, testing)
        setShow(true)
    }

    const back = () => {
        handleBack()
        setShow(false)
    }

    useEffect(() => {
        console.log(finished[id])
    })

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
                <div>
                    {finished[id] ? "Good Job! You have solved this Question" : "click to start" }
                </div>
            </div>
            
            }

        </>

    )
}


export default QuestionCard;