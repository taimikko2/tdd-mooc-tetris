import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Scoring } from "../src/Scoring.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

let board;
function tickRepeat(times) {
    for (let i=0; i<times; i++) {
        board.tick();
    }
}
function leftRepeat(times) {
    for (let i=0; i<times; i++) {
        board.moveLeft();
    }
}
function toista(times, f) {
    for (let i=0; i<times; i++) {
        f();
    }
}

describe("Scoring", () => {
    let score;
    beforeEach(() => {
        board = new Board(6, 6);
        score = new Scoring();
        board.attach(score);
        board.drop(Tetromino.I_SHAPE);
        board.tick();
    });

    //describe("some grouping", () => {    });
    it("it starts from 0 points", () => {
        //board.notify(0);
        //board.notifyLines(2);
        // board.moveDown();
        expect(score.score).to.equal(0);
    });

    it("clean one line", () => {
        board.rotateLeft();
        leftRepeat(5);
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        board.moveDown();
        expect(board.toString()).to.equalShape(
            `......
            ......
            ......
            I....I
            I....I
            I....I`
        );
        expect(score.score).to.equal(40);
    });

    xit("clean 2 lines", () => {
    });

    xit("points added to previous when cleaning continues", () => {
        // 
    });

});