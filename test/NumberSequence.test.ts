import { NumberSequence } from '../lib/NumberSequence';

describe('NumberSequence', () => {
  it('should start counting at the given value', () => {
    const sequence = new NumberSequence(500);
    expect(sequence.getNextAndIncrement()).toBe(500);
    expect(sequence.getNextAndIncrement()).toBe(501);
  });
})
