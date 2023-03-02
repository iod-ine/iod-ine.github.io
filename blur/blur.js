let shape_size = 15;
let batch = 50;

let dx_ = shape_size / 2;
let dy1 = shape_size * 3 / 4
let dy2 = shape_size / 4;

let file_input;
let d1, d2, d3, d4, d5;
let image_;

let started = false;
let looping = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  file_input = createFileInput(handleImage);
  file_input.id("file-upload");
  file_input.attribute("accept", ".png, .jpg, .jpeg");
  file_input.position(windowWidth / 10, windowHeight / 10);
  d1 = createP("Adjust the window size to set the aspect ratio.");
  d2 = createP("Upload the photo you want to transform. Whait a bit for it to load.");
  d3 = createP("Click to freeze the animation.");
  d4 = createP("Use + and - to adjust the size of the shapes.");
  d5 = createP("Reload the page to get back to this screen.");
  d1.position(windowWidth / 10, windowHeight / 5);
  d2.position(windowWidth / 10, windowHeight / 5 + 20);
  d3.position(windowWidth / 10, windowHeight / 5 + 40);
  d4.position(windowWidth / 10, windowHeight / 5 + 60);
  d5.position(windowWidth / 10, windowHeight / 5 + 80);
  noLoop();
  noStroke();
  rectMode(CENTER);
}

function draw() {
  if (started) {
    for (let i = 0; i < batch; i++) {
      sample();
    }
  }
}

function handleImage(file) {
  let uploaded_file = document.getElementById("file-upload").files[0];
  let url = URL.createObjectURL(uploaded_file);
  img = loadImage(url, () => {img.loadPixels()});
  file_input.hide();
  d1.hide();
  d2.hide();
  d3.hide();
  d4.hide();
  d5.hide();
  select("#signature").hide();
  loop();
  started = true;
  print("yes")
}

function sample() {
  let x = floor(random(0, img.width + 1));
  let y = floor(random(0, img.height + 1));
  let X = map(x, 0, img.width, 0, windowWidth);
  let Y = map(y, 0, img.height, 0, windowHeight);
  let index = (img.width * y + x) * 4;
  let r = img.pixels[index + 0];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  push();
  fill(r,g, b);
  drawSample(X, Y);
  pop();
}

function drawSample(x, y) {
    switch (random([1, 2, 3])) {
    case 1:
      circle(x, y, shape_size);
      break;
    case 2:
      rect(x, y, shape_size);
      break;
    case 3:
      triangle(x, y - dy1, x - dx_, y + dy2, x + dx_, y + dy2);
      break;
  }
}

function mouseClicked() {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
}

function keyTyped() {
  if (key === '=' || key == '+') {
    shape_size++;
  } else if(key === '-' || key === '_') {
    shape_size = shape_size < 2 ? 1 : shape_size - 1;
  }
}
