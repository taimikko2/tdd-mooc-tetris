import { Tetromino } from "./Tetromino.mjs";
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
    this.falling = false;
    for (let i = 0; i < this.height; i++) {
      this.canvas[i] = new Array(width);
      for (let j = 0; j < this.width; j++) {
        this.canvas[i][j] = ".";
      }
    }
  }

  drop(item) {
    if (this.falling) {
      throw "already falling"
    }
    this.falling = true;
    this.item = item;
    //this.item = new Tetromino(item.toString());
    //console.log("drop item \n"+item.toString()+" type "+item.type+" contructor "+ item.constructor.name+ " this "+this.item.constructor.name);

    //console.log("drop item \n"+item.toString()+"\n to canvas "+this.toString()); // toString() käyttää dataa, jota ei vielä ole alustettu
    let pos = Math.floor((this.width - 1) / 2);
    this.item_x = pos;  // itemin keskusta
    // figure out the size and shape of item
    let it = item.toString().trim().split("\n");
    this.item_h = it.length;
    this.item_w = it[0].length;
    this.item_y = Math.floor((this.item_h - 1) / 2); // keskusta

    // TODO: no need to add anything here. Just add item to canvas in toString()
    let row = this.canvas[0];
    // seuraava vie objektin canvaksen rakenteeseen, joten pitää poistaa !!
    row[pos] = item;
    //console.log("dropped item to canvas\n"+this.toString());

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

  addBlockToCanvas(can) {
    // this.item piirretään canvakselle
    // let can = this.canvas.slice(); // uusi kopio (voidaan tehdä jo ennen kutsua tai vasta täällä ?)
    if (this.item === undefined){
      // tyhjä canvas, ei ole dropattu vielä mitään
      return can;
    }
    if (this.item_h === 1 && this.item_w === 1) {
      // 1*1 :
      //console.log("addBlockToCanvas: this.item type " + this.item.type + " " + this.item.toString());
      if (this.item.type !== undefined) {
        can[this.item_x][this.item_y] = this.item.type;
      } else {
        can[this.item_x][this.item_y] = this.item.shape[0];  // block:illa ei ole tyyppiä
      }
    } else { // if (this.item_h === 3 && this.item_w === 3)
      // this.item_x ja this.item_y on keskipiste
      // kappaleen muodosta riippuen alle voi tarvita tilaa ? oletetaan, että mahtuu.
      // kappaleen paikka canvaksella (vasen yläkulma)
      let vasen = this.item_x - (this.item_w - 1) / 2; // pykälä vasemmalle
      let ylare = this.item_y - (this.item_h - 1) / 2; // alkaa riviä ylempää
      // alkaen vasemmasta yläkulmasta, pitäsi shape saada sovitettua canvakselle, 
      // silloin, kun shapessa on jotain muuta kuin piste "."
      console.log("type of item "+typeof(this.item));
      let block = this.item.toString().trim().split("\n");
      let row;
      console.log("addBlockToCanvas: " + block + " rivejä " + block.length + " yläreuna " + ylare);
      for (let r = 0; r < block.length; r++) {
        row = block[r];
        for (let i = 0; i < row.length; i++) {
          if (row[i] !== ".") {
            console.log("addBlockToCanvas: " + (ylare + r) + " ][ " + (vasen + i) + " = row[" + i + "] " + row[i]);
            can[ylare + r][vasen + i] = row[i];
          }
        }
      }
      return can;
    }
  }


  stopFalling(block) {
    //console.log("stopFalling block "+block.toString()+" item "+this.item.toString())
    if (block.isFalling()) {
      block.stopFalling();
      this.falling = false;
    }
  }

  newStopFalling() {
    //console.log("new stopFalling " + this.falling + " item " + this.item.toString())
    if (this.item.isFalling()) {
      this.item.stopFalling();
      this.falling = false; // ei toimi vielä, vaikka pitäisi olla täällä
      this.addBlockToCanvas(); // tässä pitää lisätä pysyvälle canvakselle
    }
  }

  isSpaceForItem() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä alaspäin
    // jos ei ole , niin palauta false
    if (this.item.toString().length == 1) {
      //console.log("isSpaceForItem " + this.item.toString()+" rivi "+this.item_x);
      if (this.item_x >= this.height - 1) {
        //console.log("isSpaceForItem viimeinen rivi " + this.item_x + " >= " + this.height + "-1 , paluttaa false");
        return false;
        // ei voi siirtää alemmas
      }
      let row = this.canvas[this.item_x + 1]; // seuraava_rivi
      const loc1 = row.findIndex(item => item !== "."); // ei ole vapaata tilaa, jolle siirtää
      if (loc1 >= 0) {
        //console.log("isSpaceForItem loc  " + (this.item_x + 1) + " " + (loc1 < 0));
      }
      return (loc1 < 0);
    } else {
      //console.log("isSpaceForItem (muut koot toteuttamatta)" + this.item.toString());
    }

    return true;
  }


  tick() {
    if (this.isSpaceForItem()) {
      //this.item_x += 1;
    } else {
      //this.newStopFalling();
    }
    //return;
    // alapuolelta pois, kun alkaa toimia
    /* */
    for (let i = this.height - 1; i > 0; i--) {
      // etsii nyt alhaalta ylöspäin
      let row = this.canvas[i];
      const loc1 = row.findIndex(item => item !== "."); // ei ole vapaata tilaa, jolle siirtää
      //const loc_prev = prev_row.findIndex(item => item !== ".");
      let curr_block = row[loc1];

      if (loc1 < 0) {
        this.rowTick(i);
      }
      else {
        //console.log("stopFalling rivillä " + i + " curr_block " + curr_block.toString() + " item riviilä " + this.item_x);
        //console.log("curr_block "+curr_block.toString()+" item "+this.item.toString());
        this.stopFalling(curr_block);
      }
    }
    /* */
    //console.log(this.toString());
  }

  hasFalling() {
    return (this.falling === true);
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
    let can = this.canvas.slice();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const x = can[i][j];
        //console.log(x);
        if (typeof (x) === "object") {
          //console.log("tyyppi "+typeof(x));
          res = this.addTetroToBoard(res, x); // toimii, mutta jää pois kohta
          //res += ".";
        } else {
          res += can[i][j];
        }
      }
      //console.log("canvas: " + this.addBlockToCanvas(can));
      //res = this.addBlockToCanvas(res);
      res += "\n";
    }
    return res;
  }
}
