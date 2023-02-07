function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(246);
}

function mouseClicked() {
  let p = new Paw(mouseX, mouseY, angle = 0);
}

function touchStarted() {
  mouseClicked();
}

class Paw {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;

    this.render();
  }

  render() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    noStroke();
    fill(242, 177, 178)

    bezier(0, 0, -6, 2, -10, 13, 0, 9.5);
    bezier(0, 0, 6, 2, 10, 13, 0, 9.5);

    push();
    translate(3.5, -5.5);
    rotate(15);
    ellipse(0, 0, 4.5, 7.0);
    pop();

    push();
    translate(8, -0.5);
    rotate(20);
    ellipse(0, 0, 4.5, 7);
    pop();

    push();
    translate(-3.5, -5.5);
    rotate(-15);
    ellipse(0, 0, 4.5, 7);
    pop();

    push();
    translate(-8, -0.5);
    rotate(-20);
    ellipse(0, 0, 4.5, 7);
    pop();

    pop();
  }
}
