import React from "react";
import './result.css'

const Result = ({ setShowResult }) => {

    return (
        <div className="resultContainer">
            <div className="closeResult" onClick={() => setShowResult(false)}>x</div>
            <div className="resultSheet">
                <h1>Great Work!</h1>
                <h2>Congrets! You've made it!</h2>
                <h2>You are now a skillful javascript programmer!</h2>
                <h2>Wish you will have a great journey in your career.</h2>
                <h3>Cheers,</h3>
                <h3>Sijie Shi</h3>
            </div>
        </div>
    )
}

export default Result;