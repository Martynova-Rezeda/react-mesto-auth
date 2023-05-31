export const BASE_URL = 'https://auth.nomoreparties.co';
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (username, password) => {
  return fetch(`${BASE_URL}/auth/local/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => checkResponse(res));
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/auth/local/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => checkResponse(res));
};
