import axios from 'axios';

const baseURL = 'https://swapi.dev/api';

export const instance = axios.create({
  baseURL,
});
