let pts = [];
let n_neighbors = 5;

const MAX_NEIGHBORS = 15;
const NUM_SAMPLES = 400;
const MARGIN = 45;

let ui_text;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_SAMPLES; i++) {
    let x = random(MARGIN, windowWidth - MARGIN);
    let y = random(MARGIN, windowHeight - MARGIN);
    pts.push(new Point(x, y));
  }

  ui_text = createP("Use + and - to change the numbert of neighbors (" + n_neighbors + ")");
  ui_text.addClass("ui");
  ui_text.position(5, 0);
}

function draw() {
  background(255);

  pts.forEach(p => {
    p.dist = dist(p.x, p.y, mouseX, mouseY);
    p.render();
  });

  pts.sort((p1, p2) => p1.dist - p2.dist);

  let class_counts = new Array(3).fill(0);

  stroke(0, 100);

  for (let i = 0; i < n_neighbors; i++) {
    let p = pts[i];
    class_counts[p.class]++;
    line(mouseX, mouseY, p.x, p.y);
  }

  let max_class_count = max(class_counts);

  if (class_counts[0] === max_class_count) {
    fill(255, 0, 0, 127);
  } else if (class_counts[1] === max_class_count) {
    fill(0, 255, 0, 127);
  } else {
    fill(0, 0, 255, 127);
  }

  stroke(0);
  circle(mouseX, mouseY, 9);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.class = assign_class(x, y);
  }

  render() {
    push();
    translate(this.x, this.y);
    noStroke();
    if (this.class === 0) {
      fill(255, 0, 0);
    } else if (this.class === 1) {
      fill(0, 255, 0);
    } else {
      fill(0, 0, 255);
    }
    circle(0, 0, 5);
    pop();
  }
}

function assign_class(x, y) {
  let a = windowHeight / windowWidth;

  if (y > a * x) {
    return 0;
  }

  if (windowHeight - y > a * x) {
    return 1;
  }

  return 2;
}

function keyTyped() {
  if (key === '=' || key == '+') {
    n_neighbors = n_neighbors === MAX_NEIGHBORS ? MAX_NEIGHBORS : n_neighbors + 1;
  } else if(key === '-' || key === '_') {
    n_neighbors = n_neighbors < 2 ? 1 : n_neighbors - 1;
  }
  ui_text.html("Use + and - to change the numbert of neighbors (" + n_neighbors + ")");
}
