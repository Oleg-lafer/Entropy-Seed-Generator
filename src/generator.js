// src/generator.js
const crypto = require('crypto');
const { encryptCounter, sha256 } = require('./utils/cryptoUtils');

class Generator {
  constructor() {
    this.key = crypto.randomBytes(32); // AES-256 key
    this.counter = 0; // Initialize counter
    this.dataLimit = 1024 * 1024; // 1 MiB limit before re-keying
    this.dataGenerated = 0;
  }

  // Generates a block of random data and increments the counter
  generateBlock() {
    const counterBuffer = Buffer.alloc(16);
    counterBuffer.writeBigUInt64BE(BigInt(this.counter), 8);
    const randomData = encryptCounter(this.key, counterBuffer);
    this.counter++;
    this.dataGenerated += randomData.length;

    // Re-key if data limit is reached
    if (this.dataGenerated >= this.dataLimit) {
      this.rekey();
    }

    return randomData;
  }

  // Changes the key after reaching data limit
  rekey() {
    this.key = sha256(this.key); // New key derived by hashing current key
    this.dataGenerated = 0;
  }
}

module.exports = Generator;
