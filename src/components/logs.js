import React from 'react';
import './logs.css'

const logs = props => {
    if(!props) {
        return <div></div>
    }
    return (
        props.guesses.map((feedbacks, i) => {
            return <div className='log-entry' key={i}>{feedbacks.feedback}</div>
        })
    )
}

export default logs;