import React from 'react';

const logs = props => {
    if(!props) {
        return <div></div>
    }
    return (
        props.guesses.map((feedbacks, i) => {
            return <div key={i}>{feedbacks.feedback}</div>
        })
    )
}

export default logs;