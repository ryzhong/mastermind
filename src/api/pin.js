/* eslint-disable no-plusplus */
const axios = require('axios');

let pin = '';

// Sets a random pin based on arguments given
const setRandomPIN = async (digits, min, max) => {
  const result = await axios.get(`https://www.random.org/integers/?num=${digits}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`)
    .catch((err) => console.log(err));
  pin = result.data.split('\n').filter((digit) => digit).join('');
};

// Returns PIN
const getPIN = () => pin;

// Checks to see if the guess given is the same as the PIN
const isPINCorrect = (guess) => getPIN() === guess;

// Checks the given guess with the PIN to see which digits and numbers are correct
const hasCorrectNumDigit = (guess, pinLength) => {
  const guessResult = {
    guess,
    placement: 0,
    number: 0,
  };
  const arrPIN = getPIN().split('');
  const arrGuess = guess.split('');
  for (let i = 0; i < pinLength; i++) {
    if (arrPIN[i] === arrGuess[i]) {
      guessResult.placement++;
      arrPIN[i] = null;
      arrGuess[i] = 'found';
    }
  }

  for (let i = 0; i < pinLength; i++) {
    for (let j = 0; j < pinLength; j++) {
      if (arrGuess[i] === arrPIN[j]) {
        guessResult.number++;
        arrPIN[j] = null;
        break;
      }
    }
  }

  return guessResult;
};

// Gets a random PIN number from the correct PIN and returns it
const getHint = (hintsGiven, pinLength) => {
  const userPIN = getPIN().split('');
  hintsGiven.forEach((number) => {
    userPIN.splice(userPIN.indexOf(number), 1);
  });
  const hintIndex = Math.floor(Math.random() * (pinLength - hintsGiven.length));
  return userPIN[hintIndex];
};

export default pin = {
  setRandomPIN, getPIN, isPINCorrect, hasCorrectNumDigit, getHint,
};
