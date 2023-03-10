import { Block } from "./Block.mjs";

export class RotatingShape extends Block {
  static T_SHAPES = [
    "....\nTTT.\n.T..\n....\n", // initial
    ".T..\nTT..\n.T..\n....\n", // 1 right
    "....\n.T..\nTTT.\n....\n",
    ".T..\n.TT.\n.T..\n....\n",
    "....\nTTT.\n.T..\n....\n",
  ]; // back to initial

  static I_SHAPES = [
    `....\nIIII\n....\n....\n`,
    "..I.\n..I.\n..I.\n..I.\n",
    `....\nIIII\n....\n....\n`,
  ];
  static S_SHAPES = [
    `....\n.SS.\nSS..\n....\n`,
    "S...\nSS..\n.S..\n....\n",
    `....\n.SS.\nSS..\n....\n`,
  ];
  static Z_SHAPES = [
    `....\nZZ..\n.ZZ.\n....\n`,
    `..Z.\n.ZZ.\n.Z..\n....\n`,
    `....\nZZ..\n.ZZ.\n....\n`,
  ];
  static O_SHAPES = [`....\n.OO.\n.OO.\n....\n`, `....\n.OO.\n.OO.\n....\n`]; // 2 samaa muotoa
  static L_SHAPES = [
    `....\nLLL.\nL...\n....\n`,
    `LL..\n.L..\n.L..\n....\n`,
    `....\n..L.\nLLL.\n....\n`,
    `.L..\n.L..\n.LL.\n....\n`,
    `....\nLLL.\nL...\n....\n`,
  ];
  static J_SHAPES = [
    "....\nJJJ.\n..J.\n....\n",
    ".J..\n.J..\nJJ..\n....\n",
    "....\nJ...\nJJJ.\n....\n",
    ".JJ.\n.J..\n.J..\n....\n",
    "....\nJJJ.\n..J.\n....\n",
  ];

  constructor(shape) {
    super(shape); // color ?
    this.shape = this.normalize(shape);
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }

  findShape() {
    if (RotatingShape.O_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.O_SHAPES;
    }
    if (RotatingShape.I_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.I_SHAPES;
    }
    if (RotatingShape.S_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.S_SHAPES;
    }
    if (RotatingShape.Z_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.Z_SHAPES;
    }
    if (RotatingShape.T_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.T_SHAPES;
    }
    if (RotatingShape.L_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.L_SHAPES;
    }
    if (RotatingShape.J_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.J_SHAPES;
    }
    throw new Error("findShape not found (" + this.shape + ")");
  }

  rotateRight() {
    let sh = this.findShape();
    let ind;
    if (sh.length > 0) {
      ind = sh.indexOf(this.shape);
      return new RotatingShape(sh[ind + 1]);
    }
    throw new Error("No shape found (rotateRight)");
    // return new RotatingShape(this.shape); // voitaisiin palauttaa nykyinen
  }

  rotateLeft() {
    let sh = this.findShape();
    if (sh.length > 0) {
      let ind = sh.indexOf(this.shape);
      ind = ind > 0 ? ind - 1 : sh.length - 2; // left
      return new RotatingShape(sh[ind]);
    }
    throw new Error("No shape found (rotateLeft)");
  }

  toString() {
    return this.shape;
  }
}
