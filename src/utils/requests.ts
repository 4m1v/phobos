import config from '../config/config';

import type { Image, Phobia, Session } from '../api';

type RequestOptions = {
  headers: {
    Accept: 'application/json';
    'Content-Type': 'application/json';
  };
  method: Method;
  body?: string;
};

type Method = 'GET' | 'POST';

/**
 * All functions in this file provide a standard way to access the backend API,
 * without having to worry about issues with fetch
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = (method: Method, url: string, body: any = {}): Promise<any> => {
  const requestOptions: RequestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: method,
  };

  if (method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  return fetch(url, requestOptions)
    .then((res) => res.json().then((json) => ({ status: res.status, json })))
    .then((res) => {
      if (res.status !== 200) {
        throw Error(res.json.message);
      }
      return res.json;
    });
};

export const phobiasRequest = (): Promise<Phobia[]> => {
  return request('GET', `${config.url}/api/phobias`);
};

export const startRequest = (fearMin: number, fearMax: number, phobiaId: string): Promise<{ sessionId: string }> => {
  return request('POST', `${config.url}/api/start`, {
    fearMin,
    fearMax,
    phobiaId,
  });
};

export const playRequest = (sessionId: string): Promise<Image> => {
  return request('POST', `${config.url}/api/play`, {
    sessionId,
  });
};

export const feedbackRequest = (imageId: string, sessionId: string, scariness: number): Promise<void> => {
  return request('POST', `${config.url}/api/feedback`, {
    imageId,
    sessionId,
    scariness,
  });
};

export const resultRequest = (sessionId: string): Promise<Session> => {
  return request('POST', `${config.url}/api/result`, {
    sessionId,
  });
};
