import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './modal.css';

const Modal = (props) => {
  const pic = props.result === 'win' ? 'https://media.giphy.com/media/7RkzQLwEFyhvbZeoIE/giphy.gif' : 'https://media.giphy.com/media/xYEYXCt93QZTP5adXQ/giphy.gif';
  const outcome = props.result === 'win' ? 'You Win! You were able to get your Bitcoin back!' : 'You Lose! Your Bitcoin is now lost forever. :(';
  if (!props.show) {
    return null;
  }
  return (
        <div className='modal'>
            <div className='modal-window'>
                <img className='modal-img' src={pic} alt='result' width='300px'></img>
                <div className='outcome'>{outcome}</div>
                <div>
                    <button className='btn' onClick={props.play}>Play Again</button>
                    <Link className='btn' to='/'>Go Home</Link>
                </div>
            </div>
        </div>
  );
};

export default Modal;
