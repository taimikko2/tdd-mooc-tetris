import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving falling tetrominoes", () => {

    describe("a falling tetromino can be moved left", () => {
        let board;
        beforeEach(() => {
            board = new Board(5, 5);
        });

        it("X + one tick", () => {
            board.drop(new Tetromino("X"));
            //fallToBottom(board);
            board.tick();

            expect(board.toString()).to.equalShape(
                `.....
           ..X..
           .....
           .....
           .....`
            );
        });

        xit("cannot be moved left beyond the board", () => { });

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