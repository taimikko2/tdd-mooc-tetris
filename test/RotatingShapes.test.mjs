import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating Arika shapes (4x4)", () => {
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

    xit("rotating twice left = rotating twice right", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape.rotateRight().rotateRight().toString());
    });

    // 4 kertaa kumpaan tahansa suuntaan == alkutilanne

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

    xit("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(I);
    });

    xit("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(I);
    });

    xit("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape.rotateRight().toString());
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

    // samat testit kuin T-shapessa
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
    // samat testit kuin T-shapessa

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

    xit("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(I);
    });

    xit("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(I);
    });

    xit("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape.rotateRight().toString());
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

    xit("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(I);
    });

    xit("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(I);
    });

    xit("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape.rotateRight().toString());
    });

  });

  describe("O shape", () => {
    let shape = new Tetromino(O);

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(O);
    });

    it("rotating right == initial orientation", () => {
      expect(shape.rotateRight().toString()).to.equalShape(O);
    });

    it("rotating left == initial orientation", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(O);
    });

  });

});
