import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Scoring } from "../src/Scoring.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Scoring", () => {
    let board;
    let score;
    beforeEach(() => {
        board = new Board(6, 6);
        score = new Scoring();
        board.attach(score);
        //board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    //describe("some grouping", () => {    });
    it("it starts from 0 points", () => {
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.notify(0);
        board.notifyLines(2);
        // board.moveDown();
        expect(score.score).to.equal(0);
    });

    xit("clean one line", () => {
    });

    xit("clean 2 lines", () => {
    });

    xit("points added to previous when cleaning continues", () => {
        // 
    });

});