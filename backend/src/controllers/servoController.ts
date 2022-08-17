import { Router } from 'express';
import { getRecord } from '../utils/handleRecords';
import { ServoError } from '../utils/ServoError';

export const servoController = Router();

servoController.get('/', (req, res) => {
  res.json({
    ok: true,
    data: {
      deg: req.servo.getDeg(),
      isLocked: req.servo.isLocked()
    }
  });
});

servoController.post('/execute/:recordName', async (req, res, next) => {
  const recordName = req.params.recordName;
  try {
    const record = getRecord(recordName);
    await req.servo.executeRecord(record.movements, record.delay, req.ioSocket);
    res.json({
      ok: true
    });
  } catch (e: any) {
    return next(e);
  }
});

servoController.post('/:degToSet', (req, res, next) => {
  const degToSet = parseInt(req.params.degToSet);
  if (isNaN(degToSet)) {
    return next(new ServoError(400, 'deg must be a number'));
  }

  req.servo.setDeg(degToSet);

  req.ioSocket.emit('deg-changed', { deg: req.servo.getDeg() });

  res.json({
    ok: true,
    data: {
      deg: req.servo.getDeg()
    }
  });
});
