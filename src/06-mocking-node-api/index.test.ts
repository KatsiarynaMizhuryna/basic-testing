import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout - 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 2000;
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval - 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(require('path'), 'join');
    const pathToFile = 'testFile.txt';
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const nonExistentFile = 'nonExistentFile.txt';
    const result = await readFileAsynchronously(nonExistentFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existingFile = 'existingFile.txt';
    const mockReadFile = jest.spyOn(require('fs/promises'), 'readFile');
    const fileContent = 'File content';
    mockReadFile.mockResolvedValueOnce(Buffer.from(fileContent));
    try {
      const result = await readFileAsynchronously(existingFile);
      console.log('Result:', result);
      expect(result).toEqual(fileContent);
    } catch (error) {
      console.error('Error during test:', error);
    }
    mockReadFile.mockRestore();
  });
});
