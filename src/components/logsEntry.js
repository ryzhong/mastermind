import React from 'react';
import './logsEntry.css'

const logsEntry = props => {
    if (!props) {
        return null;
    }
    return (
        props.guesses.map((feedbacks, i) => {
            return <div className='log-entry' key={i}>{feedbacks.feedback}</div>
        })
    )
}

export default logsEntry;