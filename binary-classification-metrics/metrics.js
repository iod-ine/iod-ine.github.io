let selection;
let relevant = [];
let irrelevant = [];

// coordinates for the selection rectangle
let x0, y0, x1, y1;

function setup() {
    createCanvas(windowWidth, windowHeight);

    noLoop();

    // initial example
    for (let i = 0; i < 49; i++) {
        // choose a section in which to generate a ranom obesrvation
        // so it's not accidentaly selected :)
        let x, y;

        switch (random([1, 2, 3])) {
        case 1:
            x = random(windowWidth / 2, 0.95 * windowWidth);
            y = random(0.2 * windowHeight, 0.35 * windowHeight);
            irrelevant.push(new Observation(x, y));
            break;
        case 2:
            x = random(0.65 * windowWidth, 0.95 * windowWidth);
            y = random(0.2 * windowHeight, 0.8 * windowHeight);
            irrelevant.push(new Observation(x, y));
            break;
        case 3:
            x = random(windowWidth / 2, 0.95 * windowWidth);
            y = random(0.65 * windowHeight, 0.8 * windowHeight);
            irrelevant.push(new Observation(x, y));
            break;
        }
    }

    relevant.push(new Observation(windowWidth / 4, windowHeight / 2));

    // initial selection
    let sx0 = 0.35 * windowWidth;
    let sy0 = 0.35 * windowHeight;
    let sx1 = 0.65 * windowWidth;
    let sy1 = 0.65 * windowHeight;
    selection = new Selection(sx0, sy0, sx1, sy1);

    rectMode(CORNERS);

    setupUI();
}

function draw() {
    // draw the markings for actual point classes
    push();
    noStroke();
    fill(211, 218, 202);
    rect(0, 0, windowWidth / 2, windowHeight);
    fill(241, 241, 241);
    rect(windowWidth / 2, 0, windowWidth, windowHeight);
    pop();

    // render selection first, so that points are drawn over it
    selection.render();

    // render the points
    relevant.forEach(p => {
        p.render()
    })
    irrelevant.forEach(p => {
        p.render();
    })

    // selection: rectangle
    if (drawing_selection) {
        push();
        noFill();
        rect(x0, y0, mouseX, mouseY);
        pop();
    }

    // deletion: rectangle
    if (deleting_observations) {
        push();
        noFill();
        rect(x0, y0, mouseX, mouseY);
        pop();
    }

    // UI
    renderUI();
}
