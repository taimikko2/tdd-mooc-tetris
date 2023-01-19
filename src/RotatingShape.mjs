export class RotatingShape {
    shape;

    constructor(shape) {
        //let a = new Array();
        //console.log(shape);
        this.shape = this.normalize(shape);
        //this.width = width;
        //this.height = height;
      }

    normalize(s) {
        return s.replaceAll(" ", "").trim() + "\n";
    }

    rotateRight() {
        let s = "";
        let rows = this.shape.split("\n");
        const rcount = rows.length;
        const rlen = rows[0].length;
        s += rows[2][0];
        s += rows[1][0];
        s += rows[0][0];
        s += "\n";
        s += rows[2][1];
        s += rows[1][1];
        s += rows[0][1];
        s += "\n";
        s += rows[2][2];
        s += rows[1][2];
        s += rows[0][2];
        s += "\n";
        
        return s;
        /*
    `ABC
     DEF
     GHI`
     -->
    `GDA
     HEB
     IFC`
     */
    }

    rotateLeft() {
    let s = "";
        let rows = this.shape.split("\n");
        const rcount = rows.length;
        const rlen = rows[0].length;
        s += rows[0][2];
        s += rows[1][2];
        s += rows[2][2];
        s += "\n";
        s += rows[0][1];
        s += rows[1][1];
        s += rows[2][1];
        s += "\n";
        s += rows[0][0];
        s += rows[1][0];
        s += rows[2][0];
        s += "\n";
        
        return s;
        /*
    `ABC
     DEF
     GHI`
     -->
    `CFI
     BEH
     ADG`
     */
    
    }

    toString() {
        return this.shape;
    }
}