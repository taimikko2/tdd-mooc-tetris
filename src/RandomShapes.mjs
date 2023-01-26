export class RandomShapes {
  data; // shapes
  currentItem;
  currentPosition = -1;
  
  constructor() {
    this.data = new Array(); // expect to get list of tetraminoes HERE
  }

  add(item, amount) {
    for (let i = 0; i < amount; i++) {
      this.data.push(item);
    }
    this.currentPosition = this.data.length - 1;
  }

  next() {
    if (this.currentPosition < 1) {
        this.currentPosition = this.data.length - 1;
        this.currentItem = this.data[0];
      return this.currentItem;
    }

    let pos = Math.random(this.currentPosition); 
    this.currentItem = this.data[pos];
    this.data[pos] = this.data[this.currentPosition];
    this.data[this.currentPosition] = this.currentItem;
    this.currentPosition--;
    return this.currentItem;
  }

  toString() {
    return this.shapes;
  }
}
