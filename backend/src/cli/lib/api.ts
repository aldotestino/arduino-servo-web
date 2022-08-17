import axios from 'axios';
const BASE_URL = 'http://192.168.1.112:3000';

const api = axios.create({
  validateStatus: status => status >= 200 && status <= 600
});

export async function setDeg(degToSet: number): Promise<number> {
  const { data: { data, ok } } = await api.post(`${BASE_URL}/servo/${degToSet}`);
  if (!ok) {
    throw new Error(data.errorMessage);
  }
  return data.deg;
}

export async function getDeg(): Promise<number> {
  const { data: { data, ok } } = await api.get(`${BASE_URL}/servo`);
  if (!ok) {
    throw new Error(data.errorMessage);
  }
  return data.deg;
}

export async function executeRecord(name: string): Promise<boolean> {
  const { data: { data, ok } } = await api.post(`${BASE_URL}/servo/execute/${name}`);
  if (!ok) {
    throw new Error(data.errorMessage);
  }
  return ok;
}