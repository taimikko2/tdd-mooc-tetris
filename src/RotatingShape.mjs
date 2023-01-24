import { Block } from "./Block.mjs";

export class RotatingShape extends Block {
  static T_SHAPES = ['....\nTTT.\n.T..\n....\n', // initial
                     '.T..\nTT..\n.T..\n....\n', // 1 right
                     '....\n.T..\nTTT.\n....\n', 
                     '.T..\n.TT.\n.T..\n....\n',
                     '....\nTTT.\n.T..\n....\n'];  // back to initial

  static I_SHAPES = [`....\nIIII\n....\n....\n`,"..I.\n..I.\n..I.\n..I.\n",`....\nIIII\n....\n....\n`];
  static S_SHAPES = [`....\n.SS.\nSS..\n....\n`,"S...\nSS..\n.S..\n....\n",`....\n.SS.\nSS..\n....\n`];
  static Z_SHAPES = [`....\nZZ..\n.ZZ.\n....\n`,`..Z.\n.ZZ.\n.Z..\n....\n`,`....\nZZ..\n.ZZ.\n....\n`];
  static O_SHAPES = [`....\n.OO.\n.OO.\n....\n`,`....\n.OO.\n.OO.\n....\n`]; // 2 samaa muotoa

  constructor(shape) {
    super(shape); // color ?
    this.shape = this.normalize(shape);
    //this.findShape();
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }

  findShape() {
    if (RotatingShape.O_SHAPES.indexOf(this.shape) >= 0) {
      return RotatingShape.O_SHAPES; // joku poikkeuskäsittely ?
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
    console.log("findShape ei löytänyt ("+this.shape+")")
    return ""; // ei löytynyt
  }

  rotateRight() {
    let sh = this.findShape();
    let ind;
    if (sh.length > 0) {
      ind = sh.indexOf(this.shape);
      //console.log("rotateRight ind "+ind+" palauttaa "+sh[ind+1]);
      return new RotatingShape(sh[ind+1]);
    }
    // loput turhaa ?
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
    let sh = this.findShape();
    if (sh.length > 0) {
      let ind = sh.indexOf(this.shape);
      ind = (ind>0) ? ind-1  : sh.length - 2; // left
      //console.log("rotateLeft ind "+ind+" == id2 "+id2+" palauttaa "+sh[ind]);
      return new RotatingShape(sh[ind]);
    } 
    // loput pois
    console.log("rotateLeft ei löytänyt sh");
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
