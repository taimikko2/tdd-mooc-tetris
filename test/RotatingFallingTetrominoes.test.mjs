//Level 6: Rotating falling tetrominoes

import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(8, 6);
        board.drop(Tetromino.I_SHAPE);
        //board.tick();
    });

    describe("left top corner", () => {
        it("a falling tetromino can be rotated", () => {
            board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `..I.....
                 ..I.....
                 ..I.....
                 ..I.....
                 ........
                 ........`
            );
        });

        it("it cannot be rotated when there is no room to rotate", () => {
            board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `I.......
                 I.......
                 I.......
                 I.......
                 ........
                 ........`
            );
        })

        it("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
            board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            board.moveLeft();
            //board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `........
                 IIII....
                 ........
                 ........
                 ........
                 ........`
            );
        });

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
                 ........`
            );
        });

        /*xit("it cannot be rotated when there is no room to rotate", () => {
            // kicks always -> no test available
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
                 ........`
            );
        });*/

        it("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.rotateRight();
            board.moveRight();
            board.rotateRight();
            expect(board.toString()).to.equalShape(
                `........
                 ....IIII
                 ........
                 ........
                 ........
                 ........`
            );
        });
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
                 ..I.....
                 ..I.....
                 ..I.....
                 ..I.....                 `
            );
        });

        xit("it cannot be rotated when there is no room to rotate", () => {
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
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            //board.tick();
            board.rotateLeft();
            //board.moveLeft();
            board.moveLeft();
            board.rotateLeft();
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 ........
                 ........
                 ........
                 IIII....
                 ........`
            );
        });
    });

    describe("right bottom corner", () => {
        xit("a falling tetromino can be rotated", () => {
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
            board.moveLeft();
            board.moveLeft();
            //board.rotateLeft();
            for (let i = 0; i<10; i++) {
                board.tick();
            }
            board.drop(new Tetromino(`.....\n.....\n+++++\n.....\n.....\n`));
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.rotateRight();
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            board.rotateRight();
            
            expect(board.toString()).to.equalShape(
                `........
                 ........
                 ........
                 .......+
                 .......+
                 .......+
                 .......+
                 IIII...+`
            );
        });

        xit("wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
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
                 ........
                 ........
                 ....IIII
                 ........`
            );
        });

    });

});
