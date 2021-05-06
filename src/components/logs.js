import React from 'react';
import './logs.css'
import LogsEntry from './logsEntry.js'

const logs = props => {
    if (!props) {
        return <div></div>
    }
    return (
        <div className='container-log'>
            <div className='log'>
                <div>Logs:</div>
                <LogsEntry guesses={props.guesses} />
            </div>
        </div>
    )
}

export default logs;