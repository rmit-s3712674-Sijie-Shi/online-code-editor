import React from "react";
import './result.css'

const Result = ({ setShowResult }) => {

    return (
        <div className="resultContainer">
            <div className="closeResult" onClick={() => setShowResult(false)}>x</div>
            <div className="resultSheet">
                <h1>result</h1>
                Name: 
                Result: number out of 5
            </div>
        </div>
    )
}

export default Result;