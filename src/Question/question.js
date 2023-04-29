import React from "react";
import './question.css'
import { useEffect } from "react";
import data from "./questionList.json"
import { useState } from "react";
import QuestionCard from "./questionCard";
import { useCallback } from "react";

const Question = ({setTitle}) => {
    const [queue, setQueue] = useState([])
    const [questionSelected, setQuestionSelected] = useState()
    const [selected, setSelected] = useState(false)
    
    useEffect(() => {
      const que = sessionStorage.getItem("queue").split(',')
      setQueue(que)
    },[])


    const handleBack = useCallback(() => {
        setQuestionSelected(null)
        setSelected(false)
        setTitle('') 
    }, [])

    const handleSelectQuestion = useCallback((id, title) => {
        setQuestionSelected(id)
        setSelected(true)
        setTitle(title) 
    }, [])

    return(
        <div className="questionContainer">
            <div className="cardContainer">
                <div className="title">Question list</div>
                <div className="qCard">
                    { selected ? 
                    <QuestionCard {...data[questionSelected]} key={data[questionSelected].id} handleBack={handleBack}></QuestionCard>
                    :
                    queue.map((res) => (
                        <QuestionCard {...data[res]} key={data[res].id} changeQuestion={handleSelectQuestion}></QuestionCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Question;