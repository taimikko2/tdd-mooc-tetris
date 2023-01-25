import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;
  canvas;
  falling;
  item;
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
    let pos = Math.floor((this.width - 1) / 2);
    // this.item.x ja this.item.y on vasen ylänurkka (arika on aina 4*4)
    if (item.toString().trim().length > 2) {
      pos -= 1;
    }
    this.item.x = pos;
    this.item.y = 0; // voiko olla -1, jos ylimmällä rivillä ei ole merkkejä ?
    // W ja h on aina 4
  }

  addBlockToCanvas(canStr) {
    // this.item piirretään canvakselle
    if (this.item === undefined) {
      //console.log("tyhjä canvas, ei ole dropattu vielä mitään");
      return canStr; // pitääkö muuttaa takaisin stringiksi ?
    }
    //console.log("this.item is not undefined "+this.item)
    let can;
    if (canStr === undefined) {
      //console.log("update this.canvas permanently");
      can = this.canvas;
    } else {
      // temporary canvas str
      can = canStr.trim().split("\n");
      for (let i = 0; i < can.length; i++) {
        can[i] = can[i].split("");
      }
    }

    if (this.item.length === 1) {
      can[this.item.y][this.item.x] = this.item.shape.toString();
    } else {
      // kappaleen paikka canvaksella (vasen yläkulma)
      let vasen = this.item.x;
      let ylare = this.item.y;
      // alkaen vasemmasta yläkulmasta, pitäsi shape saada sovitettua canvakselle,
      // silloin, kun shapessa on jotain muuta kuin piste "."
      let block = this.item.toString().trim().split("\n");
      let row;
      for (let r = 0; r < block.length; r++) {
        row = block[r];
        if (ylare + r < this.height) {
          for (let i = 0; i < row.length; i++) {
            if (row[i] !== ".") {
              console.log("uusi: can[" + ylare + "+" + r + "][" + vasen + "+" + i + "] ylä = " + (ylare + r) + " mahtuu " + this.height)
              can[ylare + r][vasen + i] = row[i];
            }
          }
        } else {
          console.log("uusi: can[" + ylare + "+" + r + "][] ylä = " + (ylare + r) + " > " + this.height);
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
    if (this.item === undefined) {
      //console.log("stopFalling undefined");
      return;
    }
    if (this.item.isFalling()) {
      this.item.stopFalling();
      this.falling = false;
      this.addBlockToCanvas(); // tässä pitää lisätä pysyvälle canvakselle
      this.item = undefined; // vai null ??
    }
  }

  canMoveDown() {
    // hae this.itemin paikka ja katso onko sille tilaa siirtyä alaspäin
    // jos ei ole , niin palauta false
    if (this.item === undefined) {
      return false;
    }

    if (this.item.y >= this.height - 1) {
      return false;
    }
    if (this.item.toString().trim().length == 1) {
      let row = this.canvas[this.item.y + 1]; // seuraava_rivi
      return row[this.item.x] === "."; // inko item:in kohdalla tilaa "."
    } else {
      if (this.isSpace(this.item.x, this.item.y + 1, this.item)) {
        return true;
      }
    }
    return false;
  }

  canMoveLeft() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä vasemmalle
    if (this.item === undefined) {
      return false; // nothing to move anymore
    }
    if (this.item.toString().trim().length == 1) {
      if (this.item.x <= 0) {
        return false; // jos keskikohta on jo reunassa, niin ei voi enää siirtää
      }
        let row = this.canvas[this.item.y]; // samalla rivillä
      return row[this.item.x - 1] === "."; // inko item:in kohdalla tilaa "."
    } else {
      if (this.isSpace(this.item.x - 1, this.item.y, this.item)) {
        return true;
      }
    }
    return false;
  }

  canMoveRight() {
    // hae this.itemin paikka ja kasto onko sille tilaa siirtyä oikealle
    if (this.item === undefined) {
      return false; // nothing to move anymore
    }
    if (this.item.toString().trim().length == 1) {
      if (this.item.x >= this.width - 1) {
        return false; // jos keskikohta on jo reunassa, niin ei voi enää siirtää
      }
        let row = this.canvas[this.item.y]; // samalla rivillä
      return row[this.item.x + 1] === "."; // inko item:in kohdalla tilaa "."
    } else {
      if (this.isSpace(this.item.x + 1, this.item.y, this.item)) {
        return true;
      }
    }
    return false;
  }

  isSpace(x, y, tetro) {
    let vasen = x;
    let ylare = y;
    let block = tetro.toString().trim().split("\n");
    for (let i = 0; i < block.length; i++) {
      block[i] = block[i].split("");
    }
    let item_h = block.length; // pitäisi olla 4 arika -shapella
    let item_w = block[0].length; // pitäisi olla 4 arika -shapella

    //console.log("isSpace ylä, max "+ylare+" "+this.height+" item h ja w "+item_h+" "+item_w);
    for (let r = 0; r < item_h; r++) {
      for (let j = 0; j < item_w; j++) {
        // jos shapessa on jotain muuta kuin "."
        // niin canvaksella tarvitaan tilaa siinä kohtaa
        if (block[r][j] !== ".") {
          if ((vasen + j) > this.width - 1) {
            return false; // osa palikasta on ulkopuolella
          }
          if ((vasen + j) < 0) {
            return false; // osa palikasta on ulkopuolella
          }
          if (ylare + r >= this.height) {
            return false; // on jo canvaksen alapuolella
          }
          if (this.canvas[ylare + r][vasen + j] !== ".") {
            return false;
          }
        }
      }
    }
    return true;
  }

  isAgainstWall(block) {
    // onko shapen joku osa reunaa vasten
    // pitääkö tutkia 5'5 ja 3'3 ja 1*1 erikseen ?
  }

  rotateLeft() {
    if (this.item.constructor === Tetromino) {
      console.log("this.item.constructor.name (\"Tetromino\") = "+ this.item.constructor.name);
      let temp = this.item.rotateLeft();
      if (this.isSpace(this.item.x, this.item.y, temp)) {
        console.log("rotateLeft mahtuu")
        this.item = temp;
        console.log("rotateLeft "+this.item.x +","+this.item.y+" "+this.item.shape.toString())
      } else if (this.isSpace(this.item.x - 1, this.item.y, temp)) {
        this.item = temp;
        this.item.x -= 1;
      } else if (this.isSpace(this.item.x + 1, this.item.y, temp)) {
        this.item = temp;
        this.item.x += 1;
      }
    }
  }

  rotateRight() {
    if (this.item.constructor === Tetromino) {
      //console.log("this.item.constructor.name (\"Tetromino\") = "+ this.item.constructor.name);
      let temp = this.item.rotateRight();
      if (this.isSpace(this.item.x, this.item.y, temp)) {
        this.item = temp;
      } else if (this.isSpace(this.item.x - 1, this.item.y, temp)) {
        this.item = temp;
        this.item.x -= 1;
      } else if (this.isSpace(this.item.x + 1, this.item.y, temp)) {
        this.item = temp;
        this.item.x += 1;
      }
    }
  }


  tick() {
    if (this.item === undefined) {
      //console.log("tick() this.item is undefined");
      return;
    }
    if (this.canMoveDown()) {
      this.item.y += 1;
    } else {
      this.stopFalling();
    }
  }

  hasFalling() {
    return this.falling === true;
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.item.x -= 1;
    }
  }

  moveRight() {
    if (this.canMoveRight()) {
      this.item.x += 1;
    }
  }

  moveDown() {
    if (this.canMoveDown()) {
      this.item.y += 1;
    } else {
      this.stopFalling();
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
    res = this.addBlockToCanvas(res);
    return res;
  }
}
