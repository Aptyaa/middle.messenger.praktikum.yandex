import { expect } from 'chai';

function hello(name: string) {
  return `Hello ${name}`;
}
export function sum(a: number, b: number) {
  return a + b;
}

describe('Test hello', () => {
  it('should return string correctly', () => {
    expect(hello('Mocha')).to.eq('Hello Mocha');
  });
});
describe('Test sum', () => {
  it('should return sum correctly', () => {
    expect(sum(2, 4)).to.eq(6);
  });
});
