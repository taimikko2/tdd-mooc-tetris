export class Block {
  color;
  falling;
  shape;

  constructor(color) {
    this.color = color;
    this.falling = true;
    this.shape = color;
  }

  stopFalling() {
    this.falling = false;
  }

  isFalling() {
    return this.falling === true;
  }

  toString() {
    return this.shape;
  }
}
