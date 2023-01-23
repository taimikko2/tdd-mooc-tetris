//Level 6: Rotating falling tetrominoes

import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(8, 8);
        board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    describe("left top corner", () => {
        it("a falling tetromino can be rotated", () => {
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `..I.....
                 ..I.....
                 ..I.....
                 ..I.....
                 ........
                 ........
                 ........
                 ........`
            );
        });

        it("it cannot be rotated when there is no room to rotate", () => {
            board.moveLeft();
            board.rotateLeft();
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `.I......
                 .I......
                 .I......
                 .I......
                 ........
                 ........
                 ........
                 ........`
            );
        })

        xit("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
            // to be defined
        });
        /*
        `........
                ........
                IIII....
                ........
                ........
        */

    });

    describe("right top corner", () => {
        it("a falling tetromino can be rotated", () => {
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.rotateRight();
            expect(board.toString()).to.equalShape(
                `......I.
                 ......I.
                 ......I.
                 ......I.
                 ........
                 ........
                 ........
                 ........`
            );
        });

        it("it cannot be rotated when there is no room to rotate", () => {
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.rotateRight();
            board.moveRight();
            board.rotateRight();
            expect(board.toString()).to.equalShape(
                `.......I
                 .......I
                 .......I
                 .......I
                 ........
                 ........
                 ........
                 ........`
            );

            xit("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
                // to be defined
            });

        })


    });

    describe("left bottom corner", () => {
        it("a falling tetromino can be rotated", () => {
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 ........
                 ..I.....
                 ..I.....
                 ..I.....
                 ..I.....                 `
            );
        });

        it("it cannot be rotated when there is no room to rotate", () => {
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            //board.tick();
            board.rotateLeft();
            board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 ........
                 I.......
                 I.......
                 I.......
                 I.......`
            );
        })

        xit("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
            // to be defined
        });
    });

    describe("right bottom corner", () => {
        it("a falling tetromino can be rotated", () => {
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.rotateRight();
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 ........
                 ......I.
                 ......I.
                 ......I.
                 ......I.`
            );
        });

        xit("it cannot be rotated when there is no room to rotate", () => {
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.rotateRight();
            board.moveRight();
            board.rotateRight();
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 ........
                 .......I
                 .......I
                 .......I
                 .......I`
            );
        });

        xit("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
            // to be defined
        });

    });

});
