// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    test('should create instance with provided base url', async () => {
      const axiosCreateMock = jest.spyOn(axios, 'create');
      await throttledGetDataFromApi('/posts');
      expect(axiosCreateMock).toHaveBeenCalledWith({
        baseURL: 'https://jsonplaceholder.typicode.com',
      });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest.spyOn(axios, 'get');
    await throttledGetDataFromApi('/posts');
    expect(axiosGetMock).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const responseData = [{ id: 1, title: 'Test Post' }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });
    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual(responseData);
  });
});
