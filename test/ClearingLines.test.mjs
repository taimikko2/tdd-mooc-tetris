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
            board = new Board(4, 4);
            board.drop(Tetromino.I_SHAPE);
            //board.rotateLeft();
            board.tick();
            board.moveDown();
            //board.cleanLine();
            expect(board.toString()).to.equalShape(
                `....
                ....
                ....
                ....`
            );
        });
        
        it("it is removed when line is full in the midlle of canvas", () => {
            board = new Board(5, 6);
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.I_SHAPE);
            board.moveDown();
            expect(board.toString()).to.equalShape(
                `.....
                .....
                .....
                I....
                I....
                I....`
            );
        });

    });


    describe("Two lines", () => {
        xit("2 lines removed from bottom when full", () => {
            board.drop(Tetromino.I_SHAPE);
            //board.rotateLeft();
            board.tick();
            board.moveDown();
            //---
            board.tick();
            board.drop(Tetromino.I_SHAPE);
            board.tick();
            board.tick();
            board.cleanLine();
            expect(board.toString()).to.equalShape(
                `....
         ....
         ....
         ....`
            );
        });
    });
});
