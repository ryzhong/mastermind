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
    let guessResult = {
        guess: guess,
        placement: 0,
        number: 0
    };
    let arrPIN = getPIN().split('');
    let arrGuess = guess.split('');
    for (let i = 0; i < pinLength; i++) {
        if (arrPIN[i] === arrGuess[i]) {
            guessResult.placement++;
            arrPIN[i] = null;
            arrGuess[i] = 'found'
            console.log(arrPIN, arrGuess)
        }
    }

    for (let i = 0; i < pinLength; i++) {
        for (let j = 0; j < pinLength; j++) {
            if (arrGuess[i] === arrPIN[j]) {
                guessResult.number++;
                arrPIN[j] = null;
                console.log(arrPIN, j)
                break;
            }
        }
    }

    return guessResult;
}

module.exports = { setRandomPIN, getPIN, isPINCorrect, hasCorrectNumDigit };
