import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
    //shape;
    static T_SHAPE2 = `.T.\nTTT\n...\n`;

    constructor(shape) {
        super(shape);
    }

    static get T_SHAPE() {
        return new Tetromino(this.T_SHAPE2);
    }

}
