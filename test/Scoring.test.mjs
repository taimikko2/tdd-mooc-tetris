import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Scoring } from "../src/Scoring.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

let board;
function tickRepeat(times) {
    for (let i=0; i<times; i++) {
        board.tick();
    }
}
function leftRepeat(times) {
    for (let i=0; i<times; i++) {
        board.moveLeft();
    }
}
function toista(times, f) {
    for (let i=0; i<times; i++) {
        f();
    }
}

describe("Scoring", () => {
    let score;
    beforeEach(() => {
        board = new Board(6, 6);
        score = new Scoring();
        board.attach(score);
        board.drop(Tetromino.I_SHAPE);
        board.tick();
    });

    //describe("some grouping", () => {    });
    it("it starts from 0 points", () => {
        //board.notify(0);
        //board.notifyLines(2);
        // board.moveDown();
        expect(score.score).to.equal(0);
    });

    it("clean one line", () => {
        board.rotateLeft();
        leftRepeat(5);
        tickRepeat(5);
        //toista(5, board.tick);
        board.drop(Tetromino.I_SHAPE);
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        board.moveDown();
        expect(board.toString()).to.equalShape(
            `......
            ......
            ......
            I....I
            I....I
            I....I`
        );
        expect(score.score).to.equal(40);
    });

    it("clean 2 lines", () => {
        board = new Board(5, 6);
        score = new Scoring();
        board.attach(score);
        board.drop(Tetromino.I_SHAPE);
        board.rotateLeft();
        leftRepeat(5);
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        tickRepeat(5);
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        board.moveLeft();
        tickRepeat(5);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.moveRight();
        tickRepeat(3);
        expect(board.toString()).to.equalShape(
            `.....
            .....
            .....
            .....
            I...I
            IT..I`
        );
        expect(score.score).to.equal(100);
    });

    it("points added to previous when cleaning continues", () => {
        // board = new Board(5, 6);
        // score = new Scoring();
        // board.attach(score);
        board.rotateLeft();
        leftRepeat(5);
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        tickRepeat(5);
        board.drop(Tetromino.I_SHAPE);
        tickRepeat(5);  // eka rivi poistuu -> 40
       
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.rotateLeft();
        leftRepeat(5);
        tickRepeat(5);
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        board.moveLeft();
        tickRepeat(5);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        tickRepeat(3); // 2 riviä --> +100 pistettä
        expect(board.toString()).to.equalShape(
            `......
            ......
            ......
            ......
            .I....
            IIT..I`
        );
        expect(score.score).to.equal(140);
    });

});