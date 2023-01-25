import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Scoring", () => {
    let board;
    beforeEach(() => {
        board = new Board(6, 6);
        //board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    //describe("some grouping", () => {    });
    xit("it starts from 0 points", () => {
        // board.drop(Tetromino.I_SHAPE);
        // board.tick();
        // board.moveDown();
        // expect(board.toString()).to.equalShape(
        //     `....
        //     ....
        //     ....
        //     ....`
        // );
    });

    xit("clean one line", () => {
    });

    xit("clean 2 lines", () => {
    });

    xit("points added to previous when cleaning continues", () => {
        // 
    });

});