import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RandomShapes } from "../src/RandomShapes.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

let randomShapes;
function repeatAction(times, f) {
    for (let i = 0; i < times; i++) {
        f();
    }
}

function distinctShapes(amount) {
    const distinct = new Set();
    let shape;
    for (let i = 0; i < amount; i++) {
        shape = randomShapes.next();
        distinct.add(shape);
    }
    return distinct;
}

describe("Randomness", () => {
    beforeEach(() => {
        randomShapes = new RandomShapes();
        randomShapes.add(1,1);
        randomShapes.add(2,2);
    });

    it("Produces 2 different shapes of Tetraminos", () => {
        // how to fill it with 2 types of Tetrominos only ?
        expect(distinctShapes(10).size).to.equal(2);
    });

    // Several different shapes of Tetraminos
    // Distribution of shapes
    // How to test "random" : not 1,1,1,2,2,2 not 1,2,1,2,1, etc..

});
