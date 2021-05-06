const axios = require('axios');

let pin = '';

let setRandomPIN = async (digits, min, max) => {
    let result = await axios.get(`https://www.random.org/integers/?num=${digits}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`)
        .catch(err => console.log(err))
    console.log(result.data)
    pin = result.data.split('\n').filter(digit => digit).join('');
}

let getPIN = () => {
    return pin;
}

let isPINCorrect = (guess) => {
    return getPIN() === guess;
}

let hasCorrectNumDigit = (guess, pinLength) => {
    let arrPIN = getPIN().split('');
    let arrGuess = guess.split('');
    for (let i = 0; i < pinLength; i++) {
      if (arrPIN[i] === arrGuess[i]) {
        return 'placement'
      }
    }
    for (let i = 0; i < pinLength; i++) {
      for (let j = 0; j < pinLength; j++) {
        if (arrGuess[i] === arrPIN[j]) {
          return 'number'
        }
      }
    }
    return 'wrong';
  }

module.exports = { setRandomPIN, getPIN, isPINCorrect, hasCorrectNumDigit };
