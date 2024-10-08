type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

export async function apiCall<T>(endpoint: string, options: FetchOptions): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = new URL(endpoint, baseUrl);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
