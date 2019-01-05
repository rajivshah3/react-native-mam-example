import { randomBytes } from 'react-native-randombytes';

const randomBytesFn = (length) => {
  return new Promise((resolve, reject) => {
    randomBytes(length, (err, bytes) => {
      if (err) {
        reject(err);
      }
      resolve(bytes);
    });
  });
};

// From https://github.com/iotaledger/trinity-wallet/blob/develop/src/shared/libs/crypto.js#L11
export const generateNewSeed = async () => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let seed = '';
  while (seed.length < 81) {
    const byte = await randomBytesFn(1);
    if (byte[0] < 243) {
      seed += charset.charAt(byte[0] % 27);
    }
  }
  return seed;
};
