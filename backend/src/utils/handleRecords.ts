import path from 'path';
import fs from 'fs';
import { ServoError } from './ServoError';

const RECORDS_FILE_PATH = path.join(__dirname, '..', 'records.json');

interface Record {
  movements: number[],
  delay: number
}

interface Records {
  [key: string]: Record
}

function readFile() {
  return JSON.parse(fs.readFileSync(RECORDS_FILE_PATH, 'utf-8')) as Records;
}

function writeFile(obj: Records) {
  fs.writeFileSync(RECORDS_FILE_PATH, JSON.stringify(obj));
}

export function addRecord(name: string, newRecord: Record) {
  const records = readFile();
  if (name in records) {
    throw new ServoError(400, `Record name: "${name}" already exists`);
  }
  records[name] = newRecord;

  writeFile(records);

  return {
    name,
    ...newRecord
  };
}

export function getRecord(name: string) {
  const records = readFile();
  if (!(name in records)) {
    throw new ServoError(400, `Record with name: '${name}' doesn't exist`);
  }
  return records[name];
}

export function getAllRecords() {
  return Object.keys(readFile());
}

export function deleteRecord(name: string) {
  const records = readFile();
  if (!(name in records)) {
    throw new ServoError(400, `Record with name: '${name}' doesn't exist`);
  }
  delete records[name];
  writeFile(records);

  return name;
} 
