import { expect } from "chai";
import { RandomShapes } from "../src/RandomShapes.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

let randomShapes;
/*
function repeatAction(times, f) {
  for (let i = 0; i < times; i++) {
    f();
  }
}
*/

function distinctShapes(amount) {
  const distinct = new Set();
  let shape;
  for (let i = 0; i < amount; i++) {
    shape = randomShapes.next();
    distinct.add(shape);
  }
  return distinct;
}

// Count shapes

function addTetraminos(amount) {
  // add amount Tetramino to randomShapes
  let count = 5; // how many items of same kind
  let addedCount = 0;
  let ind;
  let shapes = [
    Tetromino.T_SHAPE,
    Tetromino.I_SHAPE,
    Tetromino.L_SHAPE,
    Tetromino.J_SHAPE,
    Tetromino.S_SHAPE,
    Tetromino.Z_SHAPE,
    Tetromino.O_SHAPE
  ];
  if (amount > shapes.length) {
    throw new Error(
      "There are only " +
        shapes.length +
        " different shapes. Can't add " +
        amount +
        " (addTetraminos)."
    );
  }
  for (let i = 0; i < amount; i++) {
    ind = Math.floor(Math.random() * shapes.length);
    randomShapes.add(shapes[ind], count);
    shapes.splice(ind, 1);
    addedCount += count;
  }
  return addedCount;
}

describe("Randomness", () => {
//   beforeEach(() => {
//     randomShapes = new RandomShapes();
//     randomShapes.add(1, 1);
//     randomShapes.add(2, 2);
//   });

  it("Produces 2 different objects", () => {
    randomShapes = new RandomShapes();
    randomShapes.add(1, 1);
    randomShapes.add(2, 2);
    expect(distinctShapes(10).size).to.equal(2);
  });

  it("Produces 2 different shapes of Tetraminos", () => {
    randomShapes = new RandomShapes();
    randomShapes.add(Tetromino.I_SHAPE, 5);
    randomShapes.add(Tetromino.T_SHAPE, 5);
    expect(distinctShapes(10).size).to.equal(2);
  });

  it("Produces 3 random shapes of Tetraminos", () => {
    randomShapes = new RandomShapes();
    let differentShapes = 3;
    let sumOfAdded = addTetraminos(differentShapes);
    expect(distinctShapes(sumOfAdded).size).to.equal(differentShapes);
  });

  it("Produces several different shapes of Tetraminos", () => {
    randomShapes = new RandomShapes();
    let differentShapes = 7;
    let sumOfAdded = addTetraminos(differentShapes);
    expect(distinctShapes(2*sumOfAdded).size).to.equal(differentShapes);
   });

  //
  // Distribution of shapes
  // How to test "random" : not 1,1,1,2,2,2 not 1,2,1,2,1, etc..
});
