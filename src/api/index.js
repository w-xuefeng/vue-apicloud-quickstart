import req from './req';
import { BASE_URL, LOGIN } from './url';
req.setBseUrl(BASE_URL);

export const login = ({ username, password }) => {
  return req.post(LOGIN, { username, password });
};
