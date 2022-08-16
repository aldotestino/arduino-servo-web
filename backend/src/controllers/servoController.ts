import { Router } from 'express';
import { servo } from '../lib/servo';
import { ServoError } from '../models/ArduinoServo';

export const servoController = Router();

servoController.get('/', (req, res) => {
  res.json({
    ok: true,
    data: {
      deg: servo.getDeg()
    }
  });
});

servoController.post('/:degToSet', (req, res, next) => {
  const degToSet = parseInt(req.params.degToSet);
  if (isNaN(degToSet)) {
    return next(new ServoError(400, 'deg must be a number'));
  }

  servo.setDeg(degToSet);

  req.ioSocket.emit('deg-changed', { deg: servo.getDeg() });

  res.json({
    ok: true,
    data: {
      deg: servo.getDeg()
    }
  });
});
