// src/utils/cryptoUtils.js
const crypto = require('crypto');

// Encrypts the counter value with the given key using AES-256-CTR
function encryptCounter(key, counter) {
  const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16, 0)); // 128-bit IV of zeros
  let encrypted = cipher.update(counter);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

// SHA-256 hash function for entropy pools
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest();
}

module.exports = { encryptCounter, sha256 };
