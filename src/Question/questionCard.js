import React from "react";

const QuestionCard = ({ id, title, detail, hint, result}) => {
    return(
        <div id={id} key={id}>
            <div >
                {title}
            </div>
        </div>
    )
}


export default QuestionCard;