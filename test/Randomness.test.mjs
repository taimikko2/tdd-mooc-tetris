import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

let board;
function repeatAction(times, f) {
    for (let i = 0; i < times; i++) {
        f();
    }
}

function distinctShapes(amount) {
    const distinct = new Set();
    let shape;
    for (let i = 0; i < amount; i++) {
        shape = new RandomShapes.newShape();
        distinct.add(shape);
    }
    return distinct;
}

describe("Randomness", () => {
    beforeEach(() => {
        //board = new Board(6, 6);
        //score = new Scoring();
        //board.attach(score);
        //board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    it("Produces 2 different shapes of Tetraminos", () => {
        //board.notify(0);
        //board.notifyLines(2);
        // board.moveDown();
        expect(score.score).to.equal(0);
        expect(distinctOrientations(shape).size).to.equal(2);
    });

    // Several different shapes of Tetraminos
    // Distribution of shapes
    // How to test "random" : not 1,1,1,2,2,2 not 1,2,1,2,1, etc..

});
