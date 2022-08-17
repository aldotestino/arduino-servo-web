import { Servo, Board } from 'johnny-five';
import { Server } from 'socket.io';
import { ServoError } from '../utils/ServoError';

export const SERVO_MIN = 0;
export const SERVO_MAX = 180;

export class ArduinoServo {
  private board: Board;
  private servo: Servo | null;
  private deg: number;
  private locked: boolean;

  constructor(pin: number) {
    this.servo = null;
    this.locked = false;

    this.board = new Board({
      repl: false
    });

    this.board.on('ready', async () => {
      this.servo = new Servo({
        pin,
        range: [SERVO_MIN, SERVO_MAX],
        center: true
      });
    });

    this.deg = 90;
  }

  private sleep(timeMillis: number) {
    return new Promise(res => setTimeout(res, timeMillis));
  }

  setDeg(degToSet: number) {
    if (!this.isReady()) {
      throw new ServoError(500, 'Servo is not ready');
    }
    if (this.locked) {
      throw new ServoError(400, 'Servo is locked');
    }
    if (degToSet < SERVO_MIN || degToSet > SERVO_MAX) {
      throw new ServoError(400, `deg must be between ${SERVO_MIN} and ${SERVO_MAX}`);
    }
    this.deg = degToSet;
    this.servo!.to(degToSet);
  }

  async executeRecord(movements: number[], delay: number, ioSocket: Server) {
    if (this.locked) {
      throw new ServoError(400, 'Servo is locked');
    }
    this.locked = true;
    ioSocket.emit('locked');
    for (const degToSet of movements) {
      this.deg = degToSet;
      this.servo!.to(degToSet);
      ioSocket.emit('deg-changed', { deg: degToSet });
      await this.sleep(delay);
    }
    this.locked = false;
    ioSocket.emit('unlocked');
  }

  getDeg() {
    return this.deg;
  }

  isReady() {
    return this.servo != null;
  }

  isLocked() {
    return this.locked;
  }
}