import { increment } from '../increment';

describe('increment', () => {
  it('it returns value+1 to given value when called', async () => {
    expect(increment(0)).toBe(1);
    expect(increment(-1)).toBe(0);
    expect(increment(1.2)).toBe(2.2);
  });
});
