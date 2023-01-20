export class Board {
  width;
  height;
  items;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.items = new Array(height);
    this.falling = 0;
    for (let i = 0; i < this.height; i++) {
      this.items[i] = new Array(width);
      for (let j = 0; j < this.width; j++) {
        this.items[i][j] = ".";
      }
    }
  }

  drop(item) {
    if (this.falling) {
      throw "already falling"
    }
    let pos = Math.floor((this.width -1) / 2);
    this.items[0][pos] = item;
    this.falling += 1;
  }

  emptyRow(rivi) {
    this.items[rivi] = new Array(this.width);
    for (let x in this.items[rivi]) {
      x = ".";
    }
  }

  rowTick(rivi) {
    this.items[rivi] = this.items[rivi - 1];
    this.emptyRow(rivi - 1);
    //console.log("rowTick(" + rivi + "):\n" + this.toString());
  }

  emptyRow(rivi) {
    let a = new Array(this.width);
    a.fill(".");
    this.items[rivi] = a;
  }

  stopFalling(block) {
    if (block.isFalling()) {
      block.stopFalling();
      this.falling -= 1;
    }
  }

  tick() {
    for (let i = this.height - 1; i > 0; i--) {
      let row = this.items[i];
      const loc1 = row.findIndex(item => item !== ".");
      //const loc_prev = prev_row.findIndex(item => item !== ".");
      let curr_block = row[loc1];

      //console.log(i + " rivi loc "+loc1);

      if (loc1 < 0) {
        this.rowTick(i);
      }
      else {
        console.log("curr_block "+curr_block.toString()+" type "+typeof(curr_block));
        this.stopFalling(curr_block);
      }

    }
    console.log(this.toString());
  }

  hasFalling() {
    return (this.falling > 0);
  }

  toString() {
    let res = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const x = this.items[i][j];
        //console.log(x);
        if (x !== ".") {

          res += x.toString().trim();
        } else {
          res += this.items[i][j];
        }
      }
      res += "\n";
    }
    return res;
  }
}
