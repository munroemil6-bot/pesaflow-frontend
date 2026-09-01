import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTransferFee } from './transferFees.js';

test('calculateTransferFee charges free below 1k, 20 for 1k to 10k, and 5 for each full 10k above 10k', () => {
  assert.equal(calculateTransferFee(900), 0);
  assert.equal(calculateTransferFee(1000), 20);
  assert.equal(calculateTransferFee(10000), 20);
  assert.equal(calculateTransferFee(15000), 20);
  assert.equal(calculateTransferFee(20000), 25);
  assert.equal(calculateTransferFee(30000), 30);
});
