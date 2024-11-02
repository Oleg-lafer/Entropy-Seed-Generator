// src/fortuna.js
const Generator = require('./generator');
const EntropyAccumulator = require('./entropyAccumulator');
const SeedManager = require('./seedManager');

class Fortuna {
  constructor() {
    this.generator = new Generator();
    this.entropyAccumulator = new EntropyAccumulator();
    this.seedManager = new SeedManager();
    this.seed(this.seedManager.loadSeed());
  }

  // Initial seed setup
  seed(initialSeed) {
    this.generator.key = initialSeed;
  }

  // Reseeds the generator using entropy from the accumulator
  reseed() {
    const newSeed = this.entropyAccumulator.getReseedEntropy();
    this.generator.key = newSeed;
    this.seedManager.saveSeed(newSeed);
  }

  // Main function to generate random data
  getRandomBytes(numBytes) {
    let randomBytes = Buffer.alloc(0);
    while (randomBytes.length < numBytes) {
      randomBytes = Buffer.concat([randomBytes, this.generator.generateBlock()]);
    }
    return randomBytes.slice(0, numBytes);
  }
}

module.exports = Fortuna;
