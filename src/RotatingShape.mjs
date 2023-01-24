import { Block } from "./Block.mjs";

export class RotatingShape extends Block {
  static T_SHAPES = ['....\nTTT.\n.T..\n....\n', // initial
                     '.T..\nTT..\n.T..\n....\n', // 1 right
                     '....\n.T..\nTTT.\n....\n', 
                     '.T..\n.TT.\n.T..\n....\n',
                     '....\nTTT.\n.T..\n....\n'];  // back to initial

  constructor(shape) {
    super(shape); // color ?
    this.shape = this.normalize(shape);
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }

  rotateRight() {
    let s = "";
    let rows = this.shape.split("\n");
    const rcount = rows.length - 1; //
    const len = rows[0].length;
    for (let l = 0; l < len; l++) {
      for (let r = rcount - 1; r >= 0; r--) {
        s += rows[r][l];
      }
      s += "\n";
    }
    return new RotatingShape(s);
  }

  rotateLeft() {
    let s = "";
    let rows = this.shape.split("\n");
    const rcount = rows.length - 1; //
    const len = rows[0].length;
    for (let l = len - 1; l >= 0; l--) {
      for (let r = 0; r < rcount; r++) {
        s += rows[r][l];
      }
      s += "\n";
    }
    return new RotatingShape(s);
  }

  toString() {
    return this.shape;
  }
}
