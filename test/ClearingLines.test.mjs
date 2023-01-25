import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Clean lines", () => {
    let board;
    beforeEach(() => {
        board = new Board(4, 4);
        //board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    describe("Single line", () => {
        it("it is removed when the bottom line is full", () => {
            board.drop(Tetromino.I_SHAPE);
            //board.rotateLeft();
            board.tick();
            board.moveDown();
            expect(board.toString()).to.equalShape(
                `....
                ....
                ....
                ....`
            );
        });

    });

});
