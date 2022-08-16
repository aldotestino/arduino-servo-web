import { Request, Response, NextFunction } from 'express';
import { ServoError } from '../models/ArduinoServo';

export function handleError(err: ServoError, req: Request, res: Response, _next: NextFunction) {
  res.status(err.status).json({
    ok: false,
    data: {
      errorMessage: err.message
    }
  });
} 