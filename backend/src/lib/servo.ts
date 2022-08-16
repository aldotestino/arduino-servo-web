import { ArduinoServo } from '../models/ArduinoServo';
import 'dotenv/config';

const PIN = parseInt(process.env.PIN!) || 9;

export const servo = new ArduinoServo(PIN);