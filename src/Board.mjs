export class Board {
  width;
  height;
  canvas;
  falling;
  item;
  item_x;
  item_y;
  item_w;
  item_h;
  // vain yksi palikka liikkuu kerrallaan -> tarvitaan vain yksi item ja loput on canvasta

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = new Array(height);
    this.falling = 0;
    for (let i = 0; i < this.height; i++) {
      this.canvas[i] = new Array(width);
      for (let j = 0; j < this.width; j++) {
        this.canvas[i][j] = ".";
      }
    }
  }

  drop(item) {
    this.item = item;

    if (this.falling) {
      throw "already falling"
    }
    let pos = Math.floor((this.width - 1) / 2);
    this.item_x = pos;  // itemin keskusta
    // figure out the size and shape of item
    let it = item.toString().trim().split("\n");
    this.item_h = it.length;
    this.item_w = it[0].length;
    this.item_y = Math.floor((this.item_h - 1) / 2); // keskusta

    let row = this.canvas[0];
    row[pos] = item;
    if (item.toString().length > 1) {
      console.log("item length " + item.toString().length + "\n" + item.toString());
      if (item.toString().length <= 12) {
        // 3 * 3
        // oletetaan että sivuilla on tyhjää
        row[pos - 1] = item;
        row[pos + 1] = item;
        row = this.canvas[1];
        console.log("row = this.canvas[1] [pos]: "+pos+" "+row+" "+item);
        if (row[pos - 1] === row[pos] && row[pos] === row[pos - 1] && row[pos] === ".") {
          console.log("seuraava rivi")
          // seuraava rivi on tyhjä tältä kohtaa
          row[pos - 1] = item;
          row[pos] = item;
          row[pos + 1] = item;
        }
        row = this.canvas[2];
        if (row[pos - 1] === row[pos] && row[pos] === row[pos - 1] && row[pos] === ".") {
          console.log("seuraava rivi")
          // seuraava rivi on tyhjä tältä kohtaa
          row[pos - 1] = item;
          row[pos] = item;
          row[pos + 1] = item;
        }

        console.log("row+1 [pos]: "+pos+" "+row+" "+item);
      }
    }
    this.falling += 1;
  }

  rowTick(rivi) {
    this.canvas[rivi] = this.canvas[rivi - 1];
    this.emptyRow(rivi - 1);
    //console.log("rowTick(" + rivi + "):\n" + this.toString());
  }

  emptyRow(rivi) {
    let a = new Array(this.width);
    a.fill(".");
    this.canvas[rivi] = a;
  }
  /*emptyRow(rivi) {
    this.canvas[rivi] = new Array(this.width);
    for (let x in this.canvas[rivi]) {
      x = ".";
    }
  }*/

  addBlockToCanvas() {
    // this.item piirretään canvakselle
    // 1*1 :
    console.log("this.item type "+this.item.type+" "+this.item.toString());
    if (this.item.type !== undefined) {
      this.canvas[this.item_x][this.item_y] = this.item.type;
    } else {
      this.canvas[this.item_x][this.item_y] = this.item.shape[0];  // block:illa ei ole tyyppiä
    }
  }


  stopFalling(block) {
    console.log("stopFalling "+this.falling+" block "+block.toString()+" item "+this.item.toString())
    // if (this.item.isFalling()) {
    if (block.isFalling()) {
      block.stopFalling();
      this.item.stopFalling();
      this.falling -= 1;
      // this.addBlockToCanvas();
    }
  }

  newStopFalling() {
    console.log("new stopFalling " + this.falling + " item " + this.item.toString())
    if (this.item.isFalling()) {
      this.item.stopFalling();
      this.falling = false; // ei toimi vielä, vaikka pitäisi olla täällä
      // this.addBlockToCanvas();
    }
  }

  addBlockToCanvas() {
    // hae this.item:in paikka ja täytä vastaava shape canvaksella
  }


  isSpaceForItem() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä alaspäin
    // jos ei ole , niin palauta false
    if (this.item.toString().length == 1) {
      console.log("isSpaceForItem " + this.item.toString());
      if (this.item_x >= this.height - 1) {
        return false;
        // ei voi siirtää alemmas
      }
      let row = this.canvas[this.item_x + 1]; // seuraava_rivi
      const loc1 = row.findIndex(item => item !== "."); // ei ole vapaata tilaa, jolle siirtää
      return (loc1 < 0);
    } else {
      console.log("isSpaceForItem (muut koot toteuttamatta)" + this.item.toString());
    }

    return true;
  }


  tick() {
    if (this.isSpaceForItem()) {
      this.item_x += 1;
    } else {
      //this.newStopFalling();
    }
    // alapuolelta pois, kun alkaa toimia
/* */    
    for (let i = this.height - 1; i > 0; i--) {
      // etsii nyt alhaalta ylöspäin
      let row = this.canvas[i];
      const loc1 = row.findIndex(item => item !== "."); // ei ole vapaata tilaa, jolle siirtää
      //const loc_prev = prev_row.findIndex(item => item !== ".");
      let curr_block = row[loc1];

      //console.log(i + " rivi loc "+loc1);

      if (loc1 < 0) {
        this.rowTick(i);
      }
      else {
        console.log("curr_block "+curr_block.toString()+" item "+this.item.toString());
        this.stopFalling(curr_block);
      }
    }
    //console.log(this.toString());
  }

  hasFalling() {
    return (this.falling > 0);
  }

  addTetroToBoard(board, tetro) {
    if (tetro.toString().trim().length == 1) {
      return board + tetro.toString().trim();
    }
    //console.log("type "+tetro.type);
    return board + tetro.type; // jos shapessa on tyhjää pistäisi jättää tyhjäksi
  }

  toString() {
    // TODO: kopioi canvas ja lisää siihen this.item:in shape
    let res = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const x = this.canvas[i][j];
        //console.log(x);
        if (typeof(x) === "object") {
          //console.log("tyyppi "+typeof(x));
          res = this.addTetroToBoard(res, x); // x.toString().trim()
        } else {
          res += this.canvas[i][j];
        }
      }
      res += "\n";
    }
    return res;
  }
}
