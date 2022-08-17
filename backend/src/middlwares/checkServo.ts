import { Request, Response, NextFunction } from 'express';

export function checkServo(req: Request, res: Response, next: NextFunction) {
  if (!req.servo.isReady()) {
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