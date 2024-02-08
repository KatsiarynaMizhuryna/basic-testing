import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('posts');
    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    axiosCreateMock.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };
    jest.spyOn(axios, 'create').mockReturnValue(axiosClient as any);
    throttledGetDataFromApi('posts');
    jest.runAllTimers();
    expect(axiosClient.get).toHaveBeenCalledWith('posts');
  });

  test('should return response data', async () => {
    const responseData = {
      userId: 1,
      id: 1,
      title: 'Test Title',
      body: 'Test Body',
    };
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };
    jest.spyOn(axios, 'create').mockReturnValue(axiosClient as any);

    const resultPromise = throttledGetDataFromApi('posts');

    jest.runAllTimers();
    const result = await resultPromise;
    expect(result).toEqual(responseData);
  });
});
