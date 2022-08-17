import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { servoController } from './controllers/servoController';
import { checkServo } from './middlwares/checkServo';
import { handleError } from './middlwares/handleError';
import 'dotenv/config';
import { ArduinoServo } from './models/ArduinoServo';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      ioSocket: Server,
      servo: ArduinoServo
    }
  }
}

const servo = new ArduinoServo(parseInt(process.env.PIN!) || 9);

const app = express();
const server = http.createServer(app);
const ioSocket = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use((req, _, next) => {
  req.ioSocket = ioSocket;
  req.servo = servo;
  next();
});
app.use(checkServo);
app.use(servoController);
app.use(handleError);

ioSocket.on('connection', socket => {
  socket.on('change-deg', data => {
    servo.setDeg(data.degToSet);
    ioSocket.emit('deg-changed', { deg: servo.getDeg() });
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});