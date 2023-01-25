import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

// let board;
// function toista(n, f) {
//     for (let i = 0; i < n; i++) {
//         f();
//     }
// };

describe("Clean lines", () => {
    let board;
    beforeEach(() => {
        board = new Board(6, 6);
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
        it("2 lines removed when full", () => {
            board = new Board(5, 6);
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.moveRight();
            //toista(3, board.tick);
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.T_SHAPE);
            board.rotateLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.T_SHAPE);
            board.rotateRight();
            board.moveRight();
            board.tick();
            board.tick();
            expect(board.toString()).to.equalShape(
                `.....
                 .....
                 I...I
                 .....
                 .....
                 IT..I`
            );
        });

        it("clean 2 lines and naive gravity", () => {
            board = new Board(5, 6);
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.moveRight();
            //toista(3, board.tick);
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.T_SHAPE);
            board.rotateLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.T_SHAPE);
            board.rotateRight();
            board.moveRight();
            board.tick();
            board.tick();
            expect(board.toString()).to.equalShape(
                `.....
                 .....
                 .....
                 .....
                 I...I
                 IT..I`
            );
        });

    });
});
