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

  /*
  describe("T shape", () => {
    beforeEach(() => {
    shape = new Tetromino(T);
    shape2 = new Tetromino(T);
  });

    xit("initial orientation", () => {
      expect(shape.toString()).to.equalShape(T);
    });

    xit("can be rotated right/clockwise", () => {
      expect(shape.rotateRight().toString()).to.equalShape('.T..\nTT..\n.T..\n....\n');
    });

    xit("can be rotated left/counter-clockwise", () => {
      expect(shape.rotateLeft().toString()).to.equalShape('.T..\n.TT.\n.T..\n....\n');
    });

    xit("rotating twice right", () => {
      expect(shape.rotateRight().rotateRight().toString()).to.equalShape('....\n.T..\nTTT.\n....\n');
    });

    xit("rotating twice left = rotating twice right", () => {
      expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
    });

    xit("4 rotations right = initial orientation", () => {
      shape.rotateRight();
      shape.rotateRight();
      shape.rotateRight();
      shape.rotateRight();
      expect(shape.toString()).to.equalShape(T);
    });

    xit("4 rotations left = initial orientation", () => {
      shape.rotateLeft();
      shape.rotateLeft();
      shape.rotateLeft();
      shape.rotateLeft();
      expect(shape.toString()).to.equalShape(T);
    })

  });
*/

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
  /*
    describe("L shape", () => {
  
      it("initial orientation", () => {
        expect(shape.toString()).to.equalShape(L);
      });
  
      xit("can be rotated right/clockwise", () => {
        expect(shape.rotateRight().toString()).to.equalShape();
      });
  
      xit("can be rotated left/counter-clockwise", () => {
        expect(shape.rotateLeft().toString()).to.equalShape();
      });
  
      xit("rotating twice right", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape();
      });
  
      xit("rotating twice left = rotating twice right", () => {
        expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
      });
  
      xit("4 rotations right = initial orientation", () => {
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        expect(shape.toString()).to.equalShape(L);
      });
  
      xit("4 rotations left = initial orientation", () => {
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        expect(shape.toString()).to.equalShape(L);
      })
    });
  
    describe("J shape", () => {
  
      it("initial orientation", () => {
        expect(shape.toString()).to.equalShape(J);
      });
  
      xit("can be rotated right/clockwise", () => {
        expect(shape.rotateRight().toString()).to.equalShape();
      });
  
      xit("can be rotated left/counter-clockwise", () => {
        expect(shape.rotateLeft().toString()).to.equalShape();
      });
  
      xit("rotating twice right", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape();
      });
  
      xit("rotating twice left = rotating twice right", () => {
        expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(shape2.rotateRight().rotateRight().toString());
      });
  
      xit("4 rotations right = initial orientation", () => {
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        shape.rotateRight();
        expect(shape.toString()).to.equalShape(J);
      });
  
      xit("4 rotations left = initial orientation", () => {
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        shape.rotateLeft();
        expect(shape.toString()).to.equalShape(J);
      })
  
    });
*/  
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
  
      //`....\nZZ..\n.ZZ.\n....\n`
      //`..Z.\n.ZZ.\n.Z..\n....\n`
      it("can be rotated right/clockwise", () => {
        expect(shape.rotateRight().toString()).to.equalShape(`..Z.\n.ZZ.\n.Z..\n....\n);
      });
  
      xit("can be rotated left/counter-clockwise", () => {
        expect(shape.rotateLeft().toString()).to.equalShape();
      });
  
      xit("rotating twice right", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape();
      });
  
      xit("rotating right twice == initial orientation", () => {
        expect(shape.rotateRight().rotateRight().toString()).to.equalShape(Z);
      });
  
      xit("rotating left twice == initial orientation", () => {
        expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(Z);
      });
  
      xit("rotating left == rotating right", () => {
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
