import axios from 'axios';
const BASE_URL = 'http://192.168.1.112:3000';

const api = axios.create({
  validateStatus: status => status >= 200 && status <= 500
});

export async function setDeg(degToSet: number): Promise<number> {
  const { data: { data, ok } } = await api.post(`${BASE_URL}/${degToSet}`);
  if (!ok) {
    throw new Error(data.errorMessage);
  }
  return data.deg;
}

export async function getDeg(): Promise<number> {
  const { data: { data, ok } } = await axios.get(`${BASE_URL}/`);
  if (!ok) {
    throw new Error(data.errorMessage);
  }
  return data.deg;
}