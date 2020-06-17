import { get } from 'helpers/api';
import { formatDate } from 'helpers/date';

export const getAPOD = (dateObj) => {
  const api_key = process.env.REACT_APP_NASA_API_KEY;
  return get({
    path: 'apod',
    parameters: { api_key, date: formatDate(dateObj) },
  });
};
