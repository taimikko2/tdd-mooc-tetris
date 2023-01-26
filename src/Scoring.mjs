import { Board } from "./Board.mjs";
export class Scoring {
    level;
    score;

    constructor() {
        this.level = 0;
        this.score = 0;
    }

    update(subject) {
        if (subject instanceof Board && subject.state < 3) {
            console.log('Scoring: Reacted to the event.');
        }
    }

    updateLines(lines) {
        //console.log("updateLines(" + lines + ").");
        switch (lines) {
            case 1:
                this.score += 40 * (this.level + 1);
                break;
            case 2:
                this.score += 100 * (this.level + 1);
                break;
            case 3:
                this.score += 300 * (this.level + 1);
                break;
            case 4:
                this.score += 1200 * (this.level + 1);
                break;
            default:
                throw new Error("Too many lines removed at once " + lines);
                break;
        }
    }
}
