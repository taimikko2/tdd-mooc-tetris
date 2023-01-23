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
      this.canvas[i].fill(".");
    }
  }

  drop(item) {
    if (this.falling) {
      throw "already falling";
    }
    this.falling = true;
    this.item = item;
    //this.item = new Tetromino(item.toString());
    //console.log("drop item \n" + item.toString() + " type " + item.type + " contructor " + item.constructor.name + " this " + this.item.constructor.name);

    let pos = Math.floor((this.width - 1) / 2);
    this.item_x = pos; // itemin keskusta
    // figure out the size and shape of item
    let it = item.toString().trim().split("\n");
    this.item_h = it.length;
    this.item_w = it[0].length;
    this.item_y = Math.floor((this.item_h - 1) / 2); // keskusta
  }

  addBlockToCanvas(canStr) {
    // this.item piirretään canvakselle
    //console.log("canStr "+(canStr !== undefined)+"\n"+canStr)
    if (this.item === undefined) {
      // tyhjä canvas, ei ole dropattu vielä mitään
      return canStr; // pitääkö muuttaa takaisin stringiksi ?
    }
    //console.log("this.item is not undefined "+this.item)
    let can;
    if (canStr === undefined) {
      // update this.canvas permanently
      can = this.canvas;
    } else {
      // temporary canvas str
      can = canStr.trim().split("\n");
      for (let i = 0; i < can.length; i++) {
        can[i] = can[i].split("");
      }
    }

    if (this.item_h === 1 && this.item_w === 1) {
      can[this.item_y][this.item_x] = this.item.shape.split("")[0]; // varmuuden vuoksi, jos shape onkin pidempi
    } else {
      // if (this.item_h === 3 && this.item_w === 3)
      // this.item_x ja this.item_y on keskipiste
      // kappaleen muodosta riippuen alle voi tarvita tilaa ? oletetaan, että mahtuu.
      // kappaleen paikka canvaksella (vasen yläkulma)
      let vasen = this.item_x - (this.item_w - 1) / 2; // pykälä vasemmalle
      let ylare = this.item_y - (this.item_h - 1) / 2; // alkaa riviä ylempää
      // alkaen vasemmasta yläkulmasta, pitäsi shape saada sovitettua canvakselle,
      // silloin, kun shapessa on jotain muuta kuin piste "."
      let block = this.item.toString().trim().split("\n");
      let row;
      for (let r = 0; r < block.length; r++) {
        row = block[r];
        for (let i = 0; i < row.length; i++) {
          if (row[i] !== ".") {
            can[ylare + r][vasen + i] = row[i];
          }
        }
      }
    }
    // muuta can takaisin stringiksi
    let res = "";
    let temp;
    for (let i = 0; i < can.length; i++) {
      temp = can[i].join("");
      res += temp + "\n";
    }
    //console.log("addBlockToCanvas paluu \n" + res)
    return res;
  }

  stopFalling() {
    if (this.item.isFalling()) {
      this.item.stopFalling();
      this.falling = false;
      this.addBlockToCanvas(); // tässä pitää lisätä pysyvälle canvakselle
      this.item_x =
        this.item_y =
        this.item_h =
        this.item_w =
        this.item =
          undefined; // vai null ??
    }
  }

  isSpaceForItem() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä alaspäin
    // jos ei ole , niin palauta false
    //console.log("isSpaceForItem " + this.item)

    if (this.item.toString().trim().length == 1) {
      if (this.item_y >= this.height - 1) {
        return false;
      }
      let row = this.canvas[this.item_y + 1]; // seuraava_rivi
      return row[this.item_x] === "."; // inko item:in kohdalla tilaa "."
    } else {
      //console.log("isSpaceForItem (muut koot)" + this.item.toString().trim().length);

      if (this.item_y >= this.height - 1) {
        // blockin keskikohta putoaa canvaksen ulkopuolelle
        return false;
      }
      // kappaleen paikka canvaksella (vasen yläkulma)
      let vasen = this.item_x - (this.item_w - 1) / 2; // pykälä vasemmalle
      let ylare = this.item_y - (this.item_h - 1) / 2; // alkaa riviä ylempää
      // leveys = this.item_w
      // korkeus = this.item_h
      let block = this.item.toString().trim().split("\n");
      for (let i = 0; i < block.length; i++) {
        block[i] = block[i].split("");
      }
      // riittää, kun katsotaan tästä alaspäin
      for (let i = 0; i < this.item_h; i++) {
        if (ylare + i > this.height) {
          return true; // osa blokista on jo canvaksen alapuolella, ei tarkastella tarkemmin
        }
        // tila vain blockin leveydeltä riittää
        for (let j = 0; j < this.item_w; j++) {
          // jos shapessa on jotain muuta kuin "."
          // niin canvaksella tarvitaan tilaa siinä kohtaa
          if (block[j][i] !== ".") {
            if (this.canvas[vasen + j][ylare + i] !== ".") {
              return false;
            }
          }
        }
      }
      return true;
    }
  }

  canMoveLeft() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä vasemmalle
    // jos ei ole , niin palauta false
    //console.log("isSpaceForItem " + this.item)

    if (this.item.toString().trim().length == 1) {
      if (this.item_x <= 0) {
        return false;
      }
      let row = this.canvas[this.item_y]; // samalla rivillä
      return row[this.item_x - 1] === "."; // inko item:in kohdalla tilaa "."
    } else {
      //console.log("isSpaceForItem (muut koot)" + this.item.toString().trim().length);

      if (this.item_x <= 0) {
        // blockin keskikohta putoaa canvaksen ulkopuolelle
        return false;
      }
      // kappaleen paikka canvaksella (vasen yläkulma)
      let vasen = this.item_x - (this.item_w - 1) / 2; // pykälä vasemmalle
      let ylare = this.item_y - (this.item_h - 1) / 2; // alkaa riviä ylempää
      // leveys = this.item_w
      // korkeus = this.item_h
      let block = this.item.toString().trim().split("\n");
      for (let i = 0; i < block.length; i++) {
        block[i] = block[i].split("");
      }
      // riittää, kun katsotaan tästä alaspäin
      for (let i = 0; i < this.item_h; i++) {
        if (ylare + i > this.height) {
          return true; // osa blokista on jo canvaksen alapuolella, ei tarkastella tarkemmin
        }
        // tila vain blockin leveydeltä riittää
        for (let j = 0; j < this.item_w; j++) {
          // jos shapessa on jotain muuta kuin "."
          // niin canvaksella tarvitaan tilaa siinä kohtaa
          if (block[j][i] !== ".") {
            if (this.canvas[vasen + j][ylare + i] !== ".") {
              return false;
            }
          }
        }
      }
      return true;
    }
  }

  tick() {
    if (this.item === undefined) {
      return;
    }
    if (this.isSpaceForItem()) {
      this.item_y += 1;
    } else {
      this.stopFalling();
    }
  }

  hasFalling() {
    return this.falling === true;
  }

  moveLeft() {
    if (this.item_x > 0 && this.canMoveLeft()) {
      this.item_x -= 1;
    }
  }

  toString() {
    // kopioi canvas ja lisää siihen this.item:in shape
    let res = "";
    let can = this.canvas.slice();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        res += can[i][j];
      }
      res += "\n";
    }
    //console.log("canvas: " + this.addBlockToCanvas());
    //res = this.addBlockToCanvas("1..\n.2.\n..3\n");
    res = this.addBlockToCanvas(res);
    return res;
  }
}
