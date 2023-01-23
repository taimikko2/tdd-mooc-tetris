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
        /*
        `........
                ........
                IIII....
                ........
                ........
        */

        //    a falling tetromino can be rotated
        // left top corner
        // right top corner
        // left bottom corner
        // right bottom corner
    });

    //    it cannot be rotated when there is no room to rotate
    // left top corner
    // right top corner
    // left bottom corner
    // right bottom corner

    //    wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible
    // left top corner
    // right top corner
    // left bottom corner
    // right bottom corner
});
