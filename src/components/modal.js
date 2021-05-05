import React from 'react';
import './modal.css'

const Modal = props => {
    let pic = props.result === 'win' ? 'https://media.giphy.com/media/7RkzQLwEFyhvbZeoIE/giphy.gif' : 'https://media.giphy.com/media/xYEYXCt93QZTP5adXQ/giphy.gif';
    let outcome = props.result === 'win' ? 'You Win!' : 'You Lose!'
    if(props.show) {
        return null;
    }
    return (
        <div className='modal'>
            <div className='modal-window'>
                <img className='modal-img' src={pic} alt='result' width='300px'></img>
                <div className='outcome'>{outcome}</div>
                <div>
                    <button>Play Again</button>
                    <button>Return Home</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;