import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating Aria shapes (4x4)", () => {
  const T = "....\nTTT.\n.T..\n....\n";
  const I = "....\nIIII\n....\n....\n";
  const L = "....\nLLL.\nL...\n....\n";
  const J = "....\nJJJ.\n..J.\n....\n";
  const S = "....\n.SS.\nSS..\n....\n";
  const Z = "....\nZZ..\n.ZZ.\n....\n";
  const O = "....\n.OO.\n.OO.\n....\n";

  describe("T shape", () => {
    let shape = new Tetromino(T);
    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(T);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });
  });

  describe("I shape", () => {
    let shape = new Tetromino(I);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(I);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });


  });

  describe("L shape", () => {
    let shape = new Tetromino(L);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(L);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });

  });

  describe("J shape", () => {
    let shape = new Tetromino(J);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(J);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });

  });

  describe("S shape", () => {
    let shape = new Tetromino(S);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(S);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });

  });

  describe("Z shape", () => {
    let shape = new Tetromino(Z);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(Z);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });

  });

  describe("O shape", () => {
    let shape = new Tetromino(O);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(O);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape();
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape();
    });

  });

});
