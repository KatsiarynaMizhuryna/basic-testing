// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 5, b: 2, action: Action.Subtract, expected: 3 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 7, b: 3, action: Action.Subtract, expected: 4 },
    { a: 4, b: 3, action: Action.Multiply,expected: 12 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 3, b: 3, action: Action.Multiply, expected: 9 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 10, b: 2, action: Action.Divide, expected: 5},
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 4, b: 2, action: Action.Exponentiate, expected: 16},
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9},
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1},
    { a: 'abc', b: 3, action: '+', expected: null },
    { a: 2, b: 3, action: 'InvalidAction' as Action, expected: null},
    { a: 2, b: 'abc', action: 'InvalidAction' as Action, expected: null }
]

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should ${action} ${a} and ${b} to be ${expected}`, () => {
      const result: number|null = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
