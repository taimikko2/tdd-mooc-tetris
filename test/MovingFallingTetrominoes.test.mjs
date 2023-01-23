import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(5, 3);
        board.drop(new Tetromino("X"));
        board.tick();
    });

    describe("a falling tetromino can be moved left", () => {
        it("can be moved left", () => {
            board.moveLeft();
            expect(board.toString()).to.equalShape(
                `.....
           .X...
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
           .....`
            );
        });

        it("1*1 cannot be moved left through other blocks", () => {
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            //board.tick();
            board.drop(new Tetromino("Y"));
            board.tick();
            board.tick();
            board.moveLeft(), board.moveLeft();
            expect(board.toString()).to.equalShape(
                `.....
           .....
           XY...`
            );
        });

        it("T_SHAPE cannot be moved left through other blocks", () => {
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.drop(Tetromino.T_SHAPE);
            board.tick();
            //board.tick();
            board.moveLeft();
            //board.moveLeft();
            expect(board.toString()).to.equalShape(
                `.....
       ..T..
       XTTT.`
            );
        });
    });

    describe("a falling tetromino can be moved righ", () => {
        
        it("can be moved right", () => {
            board.moveRight();
            expect(board.toString()).to.equalShape(
                `.....
           ...X.
           .....`
            );
        });

        it("cannot be moved right beyond the board", () => { 
            board.moveRight();
            board.moveRight();
            board.moveRight();
            expect(board.toString()).to.equalShape(
                `.....
           ....X
           .....`
            );
        });

        xit("it cannot be moved right through other blocks", () => { });
    });
    /*      
              describe("a falling tetromino can be moved down", () => {
                  it("cannot be moved down beyond the board (will stop falling)", () => { });
          
                  it("cannot be moved down through other blocks (will stop falling)", () => { });
              });
          */
});
