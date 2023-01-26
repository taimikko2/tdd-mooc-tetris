import { Tetromino } from "./Tetromino.mjs";
export class RandomShapes {
  data; // shapes
  currentPosition = -1;

  constructor() {
    this.data = new Array(); // expect to get list of tetraminoes HERE
  }

  add(item, amount) {
    for (let i = 0; i < amount; i++) {
      this.data.push(item);
    }
    this.currentPosition = this.data.length - 1;
    //console.log("added randomShape "+this.data.length+" "+item);
  }

  next() {
    let currentItem;
    let pos = 0;
    if (this.currentPosition < 1) {
      this.currentPosition = this.data.length - 1; // to the last
      currentItem = this.data[0];
      return currentItem;
    }
    pos = Math.floor(Math.random() * this.currentPosition);
    currentItem = this.data[pos];
    this.data[pos] = this.data[this.currentPosition];
    this.data[this.currentPosition] = currentItem;
    this.currentPosition -= 1;
    return currentItem;
  }

  toString() {
    return this.data;
  }
}
