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
    console.log("drop item \n"+item.toString()+" type "+item.type+" contructor "+ item.constructor.name+ " this "+this.item.constructor.name);

    //console.log("drop item \n"+item.toString()+"\n to canvas "+this.toString()); // toString() käyttää dataa, jota ei vielä ole alustettu
    let pos = Math.floor((this.width - 1) / 2);
    this.item_x = pos;  // itemin keskusta
    // figure out the size and shape of item
    let it = item.toString().trim().split("\n");
    this.item_h = it.length;
    this.item_w = it[0].length;
    this.item_y = Math.floor((this.item_h - 1) / 2); // keskusta

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

  addBlockToCanvas(canStr) {
    // this.item piirretään canvakselle
    console.log("canStr "+(canStr !== undefined)+"\n"+canStr)
    // let can = this.canvas.slice(); // uusi kopio (voidaan tehdä jo ennen kutsua tai vasta täällä ?)
    if (this.item === undefined){
      // tyhjä canvas, ei ole dropattu vielä mitään
      return canStr; // pitääkö muuttaa takaisin stringiksi ?
    }
    console.log("this.item is not undefined "+this.item)
    let can;
    if (canStr === undefined) {
      // update this.canvas permanently
      can = this.canvas;
    } else {
      // temporary canvas str
      can = canStr.trim().split("\n");
      for (let i = 0; i < can.length; i++) {
        can[i] = can[i].split('');
      }
    }
    //console.log("can \n"+can+"\ncan[0]\n"+can[0]+"\ncanStr\n"+canStr)
    if (this.item_h === 1 && this.item_w === 1) {
      // 1*1 :
      console.log("addBlockToCanvas: this.item type " + this.item.type + " " + this.item.toString()+" constructor "+this.item.constructor.name+" shape "+this.item.shape);
      can[this.item_y][this.item_x] = this.item.shape.split('')[0];  // varmuuden vuoksi, jos shape onin pidempi
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
    }
    // muuta can takaisin stringiksi
    let res = "";
    let temp;
    for (let i = 0; i < can.length; i++) {
      console.log("can["+i+"] "+can[i])
      temp = can[i].join('');
      res += temp+"\n";
    }
    console.log("paluu \n"+res)
    return res;
  }


  oldStopFalling(block) {
    //console.log("stopFalling block "+block.toString()+" item "+this.item.toString())
    if (block.isFalling()) {
      block.stopFalling();
      this.falling = false;
    }
  }

  stopFalling() {
    //console.log("new stopFalling " + this.falling + " item " + this.item.toString())
    if (this.item.isFalling()) {
      this.item.stopFalling();
      this.falling = false; // ei toimi vielä, vaikka pitäisi olla täällä
      console.log("stopFalling "+this.item.toString()+" \n["+this.item_x+"]["+this.item_y+"]")
      this.addBlockToCanvas(); // tässä pitää lisätä pysyvälle canvakselle
      this.item_x = this.item_y = this.item_h = this.item_w = this.item = undefined; // vai null ??
    }
  }

  isSpaceForItem() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä alaspäin
    // jos ei ole , niin palauta false
    if (this.item.toString().length == 1) {
      //console.log("isSpaceForItem " + this.item.toString()+" rivi "+this.item_y);
      if (this.item_y >= this.height - 1) {
        //console.log("isSpaceForItem viimeinen rivi " + this.item_y + " >= " + this.height + "-1 , paluttaa false");
        return false;
        // ei voi siirtää alemmas
      }
      let row = this.canvas[this.item_y + 1]; // seuraava_rivi
      const loc1 = row.findIndex(item => item !== "."); // ei ole vapaata tilaa, jolle siirtää
      if (loc1 >= 0) {
        //console.log("isSpaceForItem loc  " + (this.item_y + 1) + " " + (loc1 < 0));
      }
      return (loc1 < 0);
    } else {
      console.log("isSpaceForItem (muut koot toteuttamatta)" + this.item.toString());
    }

    return true;
  }


  tick() {
    if (this.isSpaceForItem()) {
      this.item_y += 1;
    } else {
      this.stopFalling();
    }
    return;
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
        if (typeof (x) === "object") {
          console.log("toString: tänne ei pitäisi tulla ["+i+"]["+j+"] tyyppi "+typeof(x));
          res += ".";
        } else {
          res += can[i][j];
        }
      }
      res += "\n";
    }
    //console.log("canvas: " + this.addBlockToCanvas());
    //res = this.addBlockToCanvas("1..\n.2.\n..3\n");
    res = this.addBlockToCanvas(res);
    return res;
  }

}
