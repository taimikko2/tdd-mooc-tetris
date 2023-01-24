import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {

  constructor(shape) {
    super(shape);
    // String.prototype.match()
    //console.log("Tetromino shape ("+shape+") ");
  }

  /* ARIKA = 4*4 */
  static get ARIKA_T() {
    return new Tetromino(`....\nTTT.\n.T..\n....\n`);
  }

  static get ARIKA_I() {
    return new Tetromino(`....\nIIII\n....\n....\n`);
  }

  static get ARIKA_L() {
    return new Tetromino(`....\nLLL.\nL...\n....\n`);
  }

  static get ARIKA_J() {
    return new Tetromino(`....\nJJJ.\n..J.\n....\n`);
  }

  static get ARIKA_S() {
    return new Tetromino(`....\n.SS.\nSS..\n....\n`);
  }

  static get ARIKA_Z() {
    return new Tetromino(`....\nZZ..\n.ZZ.\n....\n`);
  }

  static get ARIKA_O() {
    return new Tetromino(`....\n.OO.\n.OO.\n....\n`);
  }

  checkLeft(tetro) {
    // jos vasemmalla on tyhjä sarake ja oikealla ei (ei kokonaan tyhjä) niin siirretään kaikkia sarakkeita vasemmalle
    let s = tetro.toString().split("\n");
    let r = s.length - 1; //

    let empty_left = true;
    let exists_right = false;
    for (let ri = 0; ri < r; ri++) {
      let rivi = s[ri];
      if (rivi[0] !== ".") {
        empty_left = false;
        break;
      }
      if (rivi[rivi.length - 1] !== ".") {
        exists_right = true;
      }
    }
    //console.log("checkLeft: " + (empty_left && exists_right));
    return empty_left && exists_right;
  }

  fixLeft(tetro) {
    let s = tetro.toString().split("\n");
    console.log("fixLeft: " + s)
    let r = s.length - 1; //
    for (let ri = 0; ri < r; ri++) {
      let rivi = s[ri];
      rivi += rivi[0];
      var tmp = rivi.split("");
      tmp.splice(0, 1);
      rivi = tmp.join("");
      s[ri] = rivi;
    }

    let res = s.join("\n");
    return new Tetromino(res);
  }

  checkTop(tetro) {
    // jos ylhäällä on tyhjä rivi ja alhaalla ei (ei kokonaan tyhjä) niin siirretään kaikkia osia rivi ylöspäin
    let s = tetro.toString().split("\n");
    let r = s.length - 1; //
    let first = s[0];
    let last = s[r - 1];

    let empty_top = first.split(".").some((s) => s) !== true;
    let exists_bottom = last.split(".").some((s) => s) === true;
    //console.log("checkTop "+(empty_top && exists_bottom))
    return empty_top && exists_bottom;
  }

  fixTop(tetro) {
    let s = tetro.toString().split("\n");
    console.log("fixTop: " + s)
    let apu = s[0];
    delete s[0];
    let res = s.join("\n");
    res += apu; //
    return new Tetromino(res);
  }

  rotateRight() {
    return new Tetromino(super.rotateRight().toString());
  }

  rotateLeft() {
    return new Tetromino(super.rotateLeft().toString());
  }
}
