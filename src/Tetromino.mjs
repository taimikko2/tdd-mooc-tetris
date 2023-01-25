import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  x;
  y;

  constructor(shape) {
    super(shape);
  }

  /* ARIKA = 4*4 */
  static get T_SHAPE() {
    return new Tetromino(`....\nTTT.\n.T..\n....\n`);
  }

  static get I_SHAPE() {
    return new Tetromino(`....\nIIII\n....\n....\n`);
  }

  static get L_SHAPE() {
    return new Tetromino(`....\nLLL.\nL...\n....\n`);
  }

  static get J_SHAPE() {
    return new Tetromino(`....\nJJJ.\n..J.\n....\n`);
  }

  static get S_SHAPE() {
    return new Tetromino(`....\n.SS.\nSS..\n....\n`);
  }

  static get Z_SHAPE() {
    return new Tetromino(`....\nZZ..\n.ZZ.\n....\n`);
  }

  static get O_SHAPE() {
    return new Tetromino(`....\n.OO.\n.OO.\n....\n`);
  }

  rotateRight() {
    let t = new Tetromino(super.rotateRight().toString());
    t.x = this.x;
    t.y = this.y;
    return t;
  }

  rotateLeft() {
    let t = new Tetromino(super.rotateLeft().toString());
    t.x = this.x;
    t.y = this.y;
    return t;
  }
}
