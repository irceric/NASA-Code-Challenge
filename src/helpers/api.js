import { stringify } from 'querystring';

/**
 * API Error - compatible with instanceof
 */
export class ApiError {
  constructor(code, message, body) {
    this.code = code;
    this.message = message;
    this.body = body;
  }
}
Object.setPrototypeOf(ApiError, Error);

/**
 * Handle response from a request (expect json)
 * @private
 *
 * @param {Object} response - Fetch response object
 */
export async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const statusCode = response.status;
  if (statusCode < 400) {
    // download csv endpoint returns content as 'text/plain' instead of 'text/csv'
    if (contentType && contentType.includes('text')) {
      return response.blob();
    }
    return response
      .json()
      .catch(() => null)
      .then((body) => body);
  }

  return response
    .json()
    .catch(() => null)
    .then((body) => {
      throw new ApiError(statusCode, response.statusText, body);
    });
}

/**
 * Generic request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} opts - options passed on to the fetch request
 */
export function request({ path, opts = {} }) {
  const baseUrl = process.env.REACT_APP_API_ROOT_URL;
  return fetch(`${baseUrl}/${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...opts,
  }).then(handleResponse);
}

/**
 * GET request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} parameters - request parameters in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function get({ path, parameters = {}, opts = {} }) {
  const queryParams = stringify(parameters);
  return request({
    path: `${path}?${queryParams}`,
    opts: {
      method: 'GET',
      ...opts,
    },
  });
}
