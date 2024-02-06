import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('Some value');
    expect(result).toBe('Some value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message',() => {
    const providedMessage = 'Something went wrong!'
    expect(() => throwError(providedMessage)).toThrowError(providedMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops, Something went wrong!'
    expect(() => throwError()).toThrowError(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
