import axios, { AxiosError } from 'axios'

export type ApiRouteDefinition = {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
}

const runApiCall = async (
  definition: ApiRouteDefinition,
  data?: object | null
) => {
  try {
    const response = await axios({
      method: definition.method,
      url: `http://localhost:3000/api${definition.path.startsWith('/') ? '' : '/'}${definition.path}`,
      data: definition.method === "GET" ? undefined : data,
      params: definition.method === "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
        // Authorization: authHeader() ? `Bearer ${authHeader()}` : "",
      },
    });
    if (response.status !== 200)
      throw new Error(response.data?.error || 'Something unexpected happened.')
    return response.data
  } catch (err) {
    if (!(err instanceof AxiosError))
      throw err
    throw new Error(err.response?.data?.error || 'Something unexpected happened.')
  }
};

export default runApiCall
