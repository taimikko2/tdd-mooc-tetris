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
  let shape;
  let shape2;


  describe("T shape", () => {
    beforeEach(() => {
      shape = new Tetromino(T);
      shape2 = new Tetromino(T);
    });

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(T);
    });

    it("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape('.T..\nTT..\n.T..\n....\n');
    });

    it("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape('.T..\n.TT.\n.T..\n....\n');
    });

    it("rotating twice right", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape('....\n.T..\nTTT.\n....\n');
    });

    it("rotating twice left = rotating twice right", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
    });

    it("4 rotations right = initial orientation", () => {
      shape.rotateRight();
      shape.rotateRight();
      shape.rotateRight();
      shape.rotateRight();
      expect(shape.toString()).to.equalShape(T);
    });

    it("4 rotations left = initial orientation", () => {
      shape.rotateLeft();
      shape.rotateLeft();
      shape.rotateLeft();
      shape.rotateLeft();
      expect(shape.toString()).to.equalShape(T);
    })

  });

  describe("I shape", () => {
    beforeEach(() => {
      shape = new Tetromino(I);
      shape2 = new Tetromino(I);
    });

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(I);
    });

    it("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape("..I.\n..I.\n..I.\n..I.\n");
    });

    it("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape("..I.\n..I.\n..I.\n..I.\n");
    });

    it("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(I);
    });

    it("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(I);
    });

    it("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape2.rotateRight().toString());
    });

  });
  
    describe("L shape", () => {
      beforeEach(() => {
        shape = new Tetromino(L);
        shape2 = new Tetromino(L);
      });
    
      it("initial orientation", () => {
        expect(shape.toString()).to.equalShape(L);
      });
  
      it("can be rotated right/clockwise", () => {
        expect(shape.rotateRight().toString()).to.equalShape(`LL..\n.L..\n.L..\n....\n`);
      });
  
      it("can be rotated left/counter-clockwise", () => {
        expect(shape.rotateLeft().toString()).to.equalShape(`.L..\n.L..\n.LL.\n....\n`);
      });
  
      it("rotating twice right", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape(`....\n..L.\nLLL.\n....\n`);
      });
  
      it("rotating twice left = rotating twice right", () => {
        expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
      });
  
      it("4 rotations right = initial orientation", () => {
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        expect(shape.toString()).to.equalShape(L);
      });
  
      it("4 rotations left = initial orientation", () => {
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        expect(shape.toString()).to.equalShape(L);
      })
    });
  
    describe("J shape", () => {
      beforeEach(() => {
        shape = new Tetromino(J);
        shape2 = new Tetromino(J);
      });
  
      it("initial orientation", () => {
        expect(shape.toString()).to.equalShape(J);
      });

      it("can be rotated right/clockwise", () => {
        expect(shape.rotateRight().toString()).to.equalShape(".J..\n.J..\nJJ..\n....\n");
      });
  
      it("can be rotated left/counter-clockwise", () => {
        expect(shape.rotateLeft().toString()).to.equalShape(".JJ.\n.J..\n.J..\n....\n");
      });
  
      it("rotating twice right", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape("....\nJ...\nJJJ.\n....\n");
      });
  
      it("rotating twice left = rotating twice right", () => {
        expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
      });
  
      it("4 rotations right = initial orientation", () => {
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        expect(shape.toString()).to.equalShape(J);
      });
  
      it("4 rotations left = initial orientation", () => {
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        expect(shape.toString()).to.equalShape(J);
      })
  
    });

  describe("S shape", () => {
    beforeEach(() => {
      shape = new Tetromino(S);
      shape2 = new Tetromino(S);
    });

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(S);
    });

    it("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape("S...\nSS..\n.S..\n....\n");
    });

    it("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape("S...\nSS..\n.S..\n....\n");
    });

    it("rotating twice right", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(S);
    });

    it("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(S);
    });

    it("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(S);
    });

    it("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape2.rotateRight().toString());
    });

  });

  describe("Z shape", () => {
    beforeEach(() => {
      shape = new Tetromino(Z);
      shape2 = new Tetromino(Z);
    });

    it("initial orientation", () => {
      expect(shape.toString()).to.equalShape(Z);
    });

    it("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape('..Z.\n.ZZ.\n.Z..\n....\n');
    });

    it("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape('..Z.\n.ZZ.\n.Z..\n....\n');
    });

    it("rotating twice right", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(Z);
    });

    it("rotating right twice == initial orientation", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape(Z);
    });

    it("rotating left twice == initial orientation", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(Z);
    });

    it("rotating left == rotating right", () => {
      expect(shape.rotateLeft().toString()).to.equalShape(shape2.rotateRight().toString());
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
