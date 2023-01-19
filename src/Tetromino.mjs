import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {

    constructor(shape) {
        super(shape);
    }

    static get T_SHAPE() {
        return new Tetromino(`.T.\nTTT\n...\n`);
    }

    static get I_SHAPE() {
        return new Tetromino(`.....\n.....\nIIII.\n.....\n.....\n`);
    }

    static get O_SHAPE() {
        return new Tetromino(`.OO\n.OO\n...\n`);
    }

    isOsahpe() {
        //console.log("isOsahpe() "+this.shape)
        let s = this.shape.trim().split("\n");
        if (s[0][0] === s[1][0] 
            && s[0][0] === s[2][0]
            && s[0][0] === s[2][1]
            && s[0][0] === s[2][2]
            
            && s[0][1] === s[0][2]
            && s[0][1] === s[1][1]
            && s[0][1] === s[1][2]
            ) {
                return true;
            }
        return false;
    }

    checkLeft(tetro) {
        // jos vasemmalla on tyhjä sarake ja oikealla ei (ei kokonaan tyhjä) niin siirretään kaikkia sarakkeita vasemmalle
        let s = tetro.toString().split("\n");
        let r = s.length - 1;

        let empty_left = true;
        let exists_right = false;
        for (let ri = 0; ri < r; ri++) {
            let rivi = s[ri];
            if (rivi[0] !== ".") {
                empty_left = false;
                break;
            }
            if (rivi[rivi.length - 1] !== ".") {
                exists_right = true;
            }
        }
        //console.log("checkLeft: " + (empty_left && exists_right));
        return (empty_left && exists_right)
    }

    fixLeft(tetro) {
        let s = tetro.toString().split("\n");
        //console.log("fixLeft: " + s)
        let r = s.length - 1;
        for (let ri = 0; ri < r; ri++) {
            let rivi = s[ri];
            rivi += rivi[0];
            var tmp = rivi.split('');
            tmp.splice(0, 1);
            rivi = tmp.join('');
            s[ri] = rivi;
        }

        let res = s.join("\n");
        return new Tetromino(res);
    }

    checkTop(tetro) {
        // jos ylhäällä on tyhjä rivi ja alhaalla ei (ei kokonaan tyhjä) niin siirretään kaikkia osia rivi ylöspäin
        let s = tetro.toString().split("\n");
        let r = s.length - 1;
        let first = s[0];
        let last = s[r - 1];

        let empty_top = (first.split('.').some(s => s) !== true);
        let exists_bottom = (last.split('.').some(s => s) === true);
        //console.log("checkTop "+(empty_top && exists_bottom))
        return (empty_top && exists_bottom);
    }

    fixTop(tetro) {
        let s = tetro.toString().split("\n");
        //console.log("fixTop: " + s)
        let apu = s[0];
        delete (s[0]);
        let res = s.join("\n");
        res += apu;
        return new Tetromino(res);
    }


    checkAndFixTetro(tetro) {
        if (this.checkTop(tetro)) {
            tetro = this.fixTop(tetro);
        }
        if (this.checkLeft(tetro)) {
            tetro = this.fixLeft(tetro);
        }
        return (new Tetromino(tetro.toString()));
    }

    rotateRight() {
        if (this.isOsahpe()) {
            return (new Tetromino(this.shape));    
        }
        let apu = super.rotateRight();
        if (apu.toString().length <= 12) {
            return (apu);
        }
        apu = this.checkAndFixTetro(apu);
        return (new Tetromino(apu.toString()));
    }

    rotateLeft() {
        if (this.isOsahpe()) {
            return (new Tetromino(this.shape));    
        }
        let apu = super.rotateLeft();
        if (apu.toString().length <= 12) {
            return (apu);
        }
        apu = this.checkAndFixTetro(apu);
        return (new Tetromino(apu.toString()));
    }

}
