import React, { useContext } from "react";
import './question.css'
import { useEffect } from "react";
import data from "./questionList.json"
import { useState } from "react";
import QuestionCard from "./questionCard";
import { useCallback } from "react";
import { TourProvider, useTour } from '@reactour/tour';
import GlobalContext from "../global-context";

const Question = ({setTitle}) => {
    const [queue, setQueue] = useState([])
    const [questionSelected, setQuestionSelected] = useState()
    const [selected, setSelected] = useState(false)
    const [finished, setFinished] = useContext(GlobalContext)
    const { setIsOpen } = useTour()
    
    useEffect(() => {
      let finish = {}
      const que = sessionStorage.getItem("queue").split(',')
      setQueue(que)
      setIsOpen(true)
      //add an object to store the status of each question by id, if they are solved or not
      que.forEach(res => {
        console.log(res)
        finish[res] = false
      })
      setFinished(finish)
    },[])

    const handleBack = useCallback(() => {
        setQuestionSelected(null)
        setSelected(false)
        setTitle({
            title: null,
            id: null,
            testing: null
        }) 
    }, [])

    const handleSelectQuestion = useCallback((id, title, testing) => {
        setQuestionSelected(id)
        setSelected(true)
        setTitle({
            title: title,
            id: id,
            testing: testing
        }) 
    }, [])

    return(
        <div className="questionContainer">
            <div className="cardContainer">
                <div className="title">Question list</div>
                {/* <button onClick={() => setShowResult(true)}>submit</button> */}
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