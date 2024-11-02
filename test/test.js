// test.js
const Fortuna = require('../src/fortuna');

// Initialize Fortuna PRNG
const fortuna = new Fortuna();

// Generate 32 random bytes
const randomData = fortuna.getRandomBytes(32);
console.log('Generated random data:', randomData.toString('hex'));
