import React from 'react';
import './modal.css'

const Modal = props => {
    let pic = props.result === 'win' ? 'https://media.giphy.com/media/7RkzQLwEFyhvbZeoIE/giphy.gif' : 'https://media.giphy.com/media/xYEYXCt93QZTP5adXQ/giphy.gif';
    let outcome = props.result === 'win' ? 'You Win! You were able to get your Bitcoin back!' : 'You Lose! Your Bitcoin is now lost forever. :('
    if(!props.show) {
        return null;
    }
    return (
        <div className='modal'>
            <div className='modal-window'>
                <img className='modal-img' src={pic} alt='result' width='300px'></img>
                <div className='outcome'>{outcome}</div>
                <div>
                    <button onClick={props.play}>Play Again</button>
                    <button onClick={() => window.location.href='/'}>Go Home</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;