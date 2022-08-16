export const BASE_URL = 'http://192.168.1.112:3000';

export async function setDeg(degToSet: number): Promise<number> {
  const res = await fetch(`${BASE_URL}/${degToSet}`, {
    method: 'POST'
  }).then(r => r.json());
  return res.data.deg;
}

export async function getDeg(): Promise<number> {
  const res = await fetch(`${BASE_URL}/`).then(r => r.json());
  return res.data.deg;
}