import { Servo, Board } from 'johnny-five';

export const SERVO_MIN = 0;
export const SERVO_MAX = 180;

export class ServoError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class ArduinoServo {
  private board: Board;
  private servo: Servo | null;
  private deg: number;

  constructor(pin: number) {
    this.servo = null;

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

  setDeg(degToSet: number) {
    if (!this.isReady()) {
      throw new ServoError(500, 'Servo is not ready');
    }
    if (degToSet < SERVO_MIN || degToSet > SERVO_MAX) {
      throw new ServoError(400, `deg must be between ${SERVO_MIN} and ${SERVO_MAX}`);
    }
    this.deg = degToSet;
    this.servo!.to(degToSet);
  }

  getDeg() {
    return this.deg;
  }

  isReady() {
    return this.servo != null;
  }
}