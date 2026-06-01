(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.eduBcrypt = factory();
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
        ? window
        : this,
  function () {
  const PREFIX = '$edu-bcrypt$';
  const DEFAULT_ROUNDS = 10;
  const MIN_ROUNDS = 1;
  const MAX_ROUNDS = 31;
  const SALT_LENGTH = 16;
  const SALT_CHARS = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function clampRounds(rounds = DEFAULT_ROUNDS) {
    const parsed = Number(rounds);

    if (!Number.isInteger(parsed) || parsed < MIN_ROUNDS || parsed > MAX_ROUNDS) {
      throw new TypeError(`rounds must be an integer between ${MIN_ROUNDS} and ${MAX_ROUNDS}`);
    }

    return parsed;
  }

  function randomInt(maxExclusive) {
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const values = new Uint32Array(1);
      const maxValidValue = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
      let randomValue = 0;

      do {
        crypto.getRandomValues(values);
        randomValue = values[0];
      } while (randomValue >= maxValidValue);

      return randomValue % maxExclusive;
    }

    return Math.floor(Math.random() * maxExclusive);
  }

  function randomSaltText(length = SALT_LENGTH) {
    let out = '';

    for (let i = 0; i < length; i += 1) {
      out += SALT_CHARS[randomInt(SALT_CHARS.length)];
    }

    return out;
  }

  function sanitizeSalt(value) {
    const salt = String(value ?? '').trim();

    if (!salt) {
      throw new TypeError('salt must be a non-empty string');
    }

    if (!/^[A-Za-z0-9./]+$/.test(salt)) {
      throw new TypeError('salt can only contain [A-Za-z0-9./]');
    }

    return salt;
  }

  function parseSaltDescriptor(descriptor) {
    const parts = String(descriptor ?? '').split('$');

    if (parts.length !== 4 || parts[0] !== '' || parts[1] !== 'edu-bcrypt') {
      throw new TypeError(`salt must look like ${PREFIX}<rounds>$<salt>`);
    }

    const rounds = clampRounds(parts[2]);
    const salt = sanitizeSalt(parts[3]);

    return { rounds, salt };
  }

  function parseHashDescriptor(value) {
    const parts = String(value ?? '').split('$');

    if (parts.length !== 5 || parts[0] !== '' || parts[1] !== 'edu-bcrypt') {
      throw new TypeError(`hashed value must look like ${PREFIX}<rounds>$<salt>$<digest>`);
    }

    const rounds = clampRounds(parts[2]);
    const salt = sanitizeSalt(parts[3]);
    const digest = parts[4];

    return { rounds, salt, digest };
  }

  function simpleHash(input) {
    let h1 = 0x811c9dc5;
    let h2 = 0x9e3779b9;

    for (let i = 0; i < input.length; i += 1) {
      const code = input.charCodeAt(i);

      h1 ^= code;
      h1 = Math.imul(h1, 0x01000193);

      h2 ^= code + i;
      h2 = Math.imul(h2, 0x85ebca6b);
    }

    return `${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0).toString(16).padStart(8, '0')}`;
  }

  function deriveDigest(text, salt, rounds) {
    let current = `${salt}:${String(text ?? '')}`;

    for (let i = 0; i < rounds; i += 1) {
      current = simpleHash(`${current}:${i}`);
    }

    return current;
  }

  function safeEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    let mismatch = 0;
    for (let i = 0; i < a.length; i += 1) {
      mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return mismatch === 0;
  }

  function generateSalt(rounds = DEFAULT_ROUNDS) {
    const parsedRounds = clampRounds(rounds);
    return `${PREFIX}${parsedRounds}$${randomSaltText()}`;
  }

  function hash(text, saltOrRounds = DEFAULT_ROUNDS) {
    let rounds;
    let salt;

    if (typeof saltOrRounds === 'number') {
      rounds = clampRounds(saltOrRounds);
      salt = randomSaltText();
    } else if (typeof saltOrRounds === 'string' && saltOrRounds.startsWith(PREFIX)) {
      const parsed = parseSaltDescriptor(saltOrRounds);
      rounds = parsed.rounds;
      salt = parsed.salt;
    } else if (typeof saltOrRounds === 'string') {
      rounds = DEFAULT_ROUNDS;
      salt = sanitizeSalt(saltOrRounds);
    } else {
      throw new TypeError('saltOrRounds must be a number or a salt string');
    }

    const digest = deriveDigest(text, salt, rounds);
    return `${PREFIX}${rounds}$${salt}$${digest}`;
  }

  function compare(text, hashedValue) {
    const parsed = parseHashDescriptor(hashedValue);
    const recalculated = `${PREFIX}${parsed.rounds}$${parsed.salt}$${deriveDigest(text, parsed.salt, parsed.rounds)}`;

    return safeEqual(recalculated, String(hashedValue));
  }

  return {
      generateSalt,
      hash,
      compare,
      constants: {
        PREFIX,
        DEFAULT_ROUNDS,
        MIN_ROUNDS,
        MAX_ROUNDS,
      },
    };
  }
);
