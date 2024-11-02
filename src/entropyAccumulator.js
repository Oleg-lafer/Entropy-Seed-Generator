// src/entropyAccumulator.js
const { sha256 } = require('./utils/cryptoUtils');

class EntropyAccumulator {
  constructor(poolCount = 32) {
    this.pools = Array.from({ length: poolCount }, () => Buffer.alloc(0));
    this.reseedCounter = 0;
  }

  // Adds entropy to a specific pool
  addEntropy(data, source = 0) {
    const poolIndex = source % this.pools.length;
    this.pools[poolIndex] = Buffer.concat([this.pools[poolIndex], data]);
  }

  // Gathers entropy from the pools to reseed the generator
  getReseedEntropy() {
    const seedData = sha256(Buffer.concat(this.pools));
    this.clearPools();
    return seedData;
  }

  clearPools() {
    this.pools = this.pools.map(() => Buffer.alloc(0));
  }
}

module.exports = EntropyAccumulator;
