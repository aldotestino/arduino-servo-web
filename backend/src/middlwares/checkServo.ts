import { Request, Response, NextFunction } from 'express';
import { servo } from '../lib/servo';

export function checkServo(req: Request, res: Response, next: NextFunction) {
  if (!servo.isReady()) {
    res.status(500).json({
      ok: false,
      data: {
        errorMessage: 'Servo is not ready'
      }
    });
  } else {
    next();
  }
}