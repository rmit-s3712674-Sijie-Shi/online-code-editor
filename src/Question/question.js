import React from "react";
import './question.css'
import { useEffect } from "react";
import data from "./questionList.json"
import { useState } from "react";
import QuestionCard from "./questionCard";

const Question = () => {
    const [queue, setQueue] = useState([])
    useEffect(() => {
        getRandomQues(0,9)
        return (() => setQueue([]))        
    },[])

    const getRandomQues = (min, max) => {
        let result = []
        function getRandom(){
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        while(result.length < 5) {
            let num = getRandom()
            if(result.indexOf(num) < 0) {
                result.push(num)
            }
        }
        setQueue(result)
        console.log(queue)
        return result
    }

    return(
        <div className="questionContainer">
            <div className="cardContainer">
                <div className="title">Question list</div>
                <div>
                    {queue.map((res) => (
                        <QuestionCard {...data[res]}></QuestionCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Question;