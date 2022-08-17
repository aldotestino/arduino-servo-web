import { Router } from 'express';
import { addRecord, deleteRecord, getAllRecords, getRecord } from '../utils/handleRecors';
import z from 'zod';
import { ServoError } from '../utils/ServoError';

const recordSchema = z.object({
  name: z.string(),
  movements: z.number().min(0).max(180).array(),
  delay: z.number()
});

export const recordController = Router();

recordController.get('/', (req, res) => {
  res.json({
    ok: true,
    data: { records: getAllRecords() }
  });
});

recordController.get('/:recordName', (req, res, next) => {
  const name = req.params.recordName;
  try {
    const record = getRecord(name);
    res.json({
      ok: true,
      data: {
        name,
        record
      }
    });
  } catch (e: any) {
    return next(e);
  }
});

recordController.post('/', (req, res, next) => {
  const parsedBody = recordSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return next(new ServoError(400, parsedBody.error.message));
  } else {
    const { name, movements, delay } = parsedBody.data;
    try {
      const record = addRecord(name, { movements, delay });
      res.json({
        ok: true,
        data: {
          name
        }
      });
    } catch (e: any) {
      return next(e);
    }
  }
});

recordController.delete('/:recordName', (req, res, next) => {
  const name = req.params.recordName;
  try {
    deleteRecord(name);
    res.json({
      ok: true
    });
  } catch (e: any) {
    return next(e);
  }
});