import React from "react";

const QuestionCard = ({ id, title, detail, hint, result}) => {
    return(
        <div id={id}>
            <div >
                {title}
            </div>
        </div>
    )
}


export default QuestionCard;