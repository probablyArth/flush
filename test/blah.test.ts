import { Flush } from '../src/index';

const sum = (a: number, b: number) => a + b;

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

describe('test default console processor', () => {
  it('prints to console', () => {
    const spy = jest.spyOn(console, 'log');
    const flush = new Flush('DEBUG');
    flush.flush({ level: 'DEBUG', message: 'test' });
    expect(spy).toHaveBeenCalled();
  });
});
