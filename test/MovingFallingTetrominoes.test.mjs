import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving falling tetrominoes", () => {

    describe("a falling tetromino can be moved left", () => {
        let board;
        beforeEach(() => {
            board = new Board(5, 4);
            board.drop(new Tetromino("X"));
            board.tick();
        });

        it("can be moved left", () => {
            board.moveLeft();
            expect(board.toString()).to.equalShape(
                `.....
           .X...
           .....
           .....`
            );
        });

        it("cannot be moved left beyond the board", () => {
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            expect(board.toString()).to.equalShape(
                `.....
           X....
           .....
           .....`
            );
        });

        xit("cannot be moved left through other blocks", () => { });
    });
/*
    describe("a falling tetromino can be moved righ", () => {
        it("cannot be moved right beyond the board", () => { });

        it("it cannot be moved right through other blocks", () => { });
    });

    describe("a falling tetromino can be moved down", () => {
        it("cannot be moved down beyond the board (will stop falling)", () => { });

        it("cannot be moved down through other blocks (will stop falling)", () => { });
    });
*/
});