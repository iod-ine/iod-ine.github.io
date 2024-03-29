function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(246);
  addButton(
    "https://iod-ine.github.io/blur/blur.html",
    "assets/btn-blur-an-image.png",
    50,
    50,
  );
  addButton(
    "https://iod-ine.github.io/binary-classification-metrics/metrics.html",
    "assets/btn-binary-classification-metrics.png",
    50,
    110,
  );
  addButton(
    "https://iod-ine.github.io/neighbors/neighbors.html",
    "assets/btn-neighbors.png",
    50,
    250,
  );
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

function addButton(link_src, img_path, x, y) {
  let link_blur_an_image = createA(link_src, "");
  link_blur_an_image.position(x, y);
  let btn_blur_an_image = createImg(img_path);
  link_blur_an_image.child(btn_blur_an_image);
}
