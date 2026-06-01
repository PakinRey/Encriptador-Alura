'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const eduBcrypt = require('../index');

test('generateSalt returns bcrypt-like descriptor', () => {
  const salt = eduBcrypt.generateSalt(12);
  assert.match(salt, /^\$edu-bcrypt\$12\$[./A-Za-z0-9]{16}$/);
});

test('hash is deterministic when using the same salt descriptor', () => {
  const salt = eduBcrypt.generateSalt(8);
  const first = eduBcrypt.hash('hola mundo', salt);
  const second = eduBcrypt.hash('hola mundo', salt);

  assert.equal(first, second);
});

test('compare validates a matching value and rejects a different one', () => {
  const hashed = eduBcrypt.hash('secreto', 10);

  assert.equal(eduBcrypt.compare('secreto', hashed), true);
  assert.equal(eduBcrypt.compare('otro', hashed), false);
});
