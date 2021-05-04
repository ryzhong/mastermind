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


module.exports = {setRandomPIN, getPIN};
