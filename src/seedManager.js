// src/seedManager.js
const fs = require('fs');
const path = './seed.dat';
const crypto = require('crypto');

class SeedManager {
  // Loads the last saved seed or creates a new one
  loadSeed() {
    if (fs.existsSync(path)) {
      return fs.readFileSync(path);
    } else {
      const newSeed = crypto.randomBytes(32);
      this.saveSeed(newSeed);
      return newSeed;
    }
  }

  // Saves the current seed to file
  saveSeed(seed) {
    fs.writeFileSync(path, seed);
  }
}

module.exports = SeedManager;
