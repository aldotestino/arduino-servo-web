export const BASE_URL = 'http://192.168.1.112:3000';

export async function setDeg(degToSet: number): Promise<number> {
  const res = await fetch(`${BASE_URL}/servo/${degToSet}`, {
    method: 'POST'
  }).then(r => r.json());
  return res.data.deg;
}

export async function getDeg(): Promise<{ deg: number, isLocked: boolean }> {
  const res = await fetch(`${BASE_URL}/servo`).then(r => r.json());
  return res.data;
}

export async function getAllRecords(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/record`).then(r => r.json());
  return res.data.records;
}

export async function executeRecord(name: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/servo/execute/${name}`, { method: 'POST' }).then(r => r.json());
  return res.ok;
}

export async function addRecord(name: string, movements: number[], delay: number) {
  const res = await fetch(`${BASE_URL}/record`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, movements, delay })
    }
  ).then(r => r.json());
  return res;
}

export async function deleteRecord(name: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/record/${name}`, { method: 'DELETE' }).then(r => r.json());
  return res.ok;
}