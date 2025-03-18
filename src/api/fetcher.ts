import type { TResponse } from './types';

const API_URL = 'https://restcountries.com/v3.1';

interface RequestProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: string;
  header?: Record<string, string>;
  body?: string | FormData;
}

class Fetcher {
  private request<T>({ method, url = '', header, body }: RequestProps): Promise<TResponse<T>> {
    const info: { status: number; error: string } = {
      status: 500,
      error: 'Unknown',
    };
    const headers = header ?? { 'Content-Type': 'application/json' };

    return fetch(`${API_URL}/${url}`, { method, headers, body })
      .then(response => {
        info.status = response.status;
        if (Math.floor(response.status / 100) !== 2) {
          info.error = response.statusText;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(info.error || 'Havent got a JSON');
        }
        return response.json();
      })
      .then(data => {
        return { data } as TResponse<T>;
      })
      .catch(error => ({
        error: {
          message: error instanceof Error ? error.message : info.error,
          name: error instanceof Error ? error.name : info.error,
          status: info.status,
        },
      }));
  }

  public get = <T>(url: string): Promise<TResponse<T>> => {
    return this.request<T>({ method: 'GET', url });
  };
}

const fetcher = new Fetcher();

export default fetcher;
