export class Block {
  color;
  falling;

  constructor(color) {
    this.color = color;
    this.falling = true;
  }

  stopFalling() {
    this.falling = false;
  }

  isFalling() {
    return (this.falling === true);
  }


  toString() {
    return this.color;
  }
}
