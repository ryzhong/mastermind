import React from 'react';
import './logsEntry.css';

const logsEntry = props => {
    if (!props) {
        return null;
    }
    return (
        props.guesses.map((feedbacks, i) => {
            if(i !== 0) {
                return <div className='log-entry' key={i}>{feedbacks.feedback}</div>
            }
            return <div className='log-entry current' key={i}>{feedbacks.feedback}</div>
        })
    )
}

export default logsEntry;