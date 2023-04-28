import React from "react";
import './question.css'
import { useEffect } from "react";
import data from "./questionList.json"
import { useState } from "react";
import QuestionCard from "./questionCard";
import { useCallback } from "react";

const Question = () => {
    const [queue, setQueue] = useState([])
    useEffect(() => {
      const que = sessionStorage.getItem("queue").split(',')
      setQueue(que)
    },[])



    return(
        <div className="questionContainer">
            <div className="cardContainer">
                <div className="title">Question list</div>
                <div className="qCard">
                    {queue.map((res) => (
                        <QuestionCard {...data[res]}></QuestionCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Question;