// UI control: buttons
let a_pressed = false;
let d_pressed = false;
let s_pressed = false;

// UI control: actions
let drawing_selection = false;
let deleting_observations = false;

// UI: text
let add_observations_text;
let delete_observations_text;
let draw_selection_text;

function setupUI() {
    add_observations_text = createP("A: add observations");
    add_observations_text.addClass("ui");
    add_observations_text.position(5, 0);

    delete_observations_text = createP("D: delete observations");
    delete_observations_text.addClass("ui");
    delete_observations_text.position(5, 20);

    draw_selection_text = createP("S: draw selection");
    draw_selection_text.addClass("ui");
    draw_selection_text.position(5, 40);

    // for mobile devices. add observations mode is the only thing active
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        relevant = [];
        irrelevant = [];
        a_pressed = true;
        add_observations_text.addClass("ui-active");
        add_observations_text.html("press to add observations");
        delete_observations_text.hide();
        draw_selection_text.hide();
        selection.calculate_metrics();
    }
}

function renderUI() {
    push();
    noStroke();

    let t;

    // displaying metrics
    push();
    stroke(0);
    strokeWeight(0.5);
    rectMode(CENTER);
    fill(227);
    rect(windowWidth / 2, 40, 365, 70);

    noStroke();
    textAlign(CENTER);
    fill(0);
    textSize(17);

    t = "Accuracy: " + round(selection.accuracy, 3);
    text(t, windowWidth / 2, 20);

    t = "Sensitivity: " + round(selection.sensitivity, 3);
    t = t + "  Specificity: " + round(selection.specificity, 3);
    text(t, windowWidth / 2, 45);

    t = "Precision: " + round(selection.precision, 3);
    t = t + "  Recall: " + round(selection.recall, 3);
    t = t + "  F1-score: " + round(selection.f_score, 3);
    text(t, windowWidth / 2, 70);
    pop();

    // counts
    textAlign(CENTER);
    textSize(16)
    fill(0);
    text("Relevant observations: " + relevant.length, 0.25 * windowWidth, 0.18 * windowHeight);
    text("Irrelevant observations: " + irrelevant.length, 0.75 * windowWidth, 0.18 * windowHeight);
    textSize(17);
    textStyle(BOLD);
    text("Total observations: " + (irrelevant.length + relevant.length), windowWidth / 2, 0.16 * windowHeight);

    pop();
}

function mousePressed() {
    if (s_pressed) {
        drawing_selection = true;
        x0 = mouseX;
        y0 = mouseY;
    }
    if (d_pressed) {
        deleting_observations = true;
        x0 = mouseX;
        y0 = mouseY;
    }
    if (a_pressed) {
        x0 = mouseX;
        y0 = mouseY;

        let observation = new Observation(x0, y0);

        if (x0 < windowWidth / 2) {
            relevant.push(observation);
        } else {
            irrelevant.push(observation);
        }

        selection.calculate_metrics();
    }

    loop();
}

function mouseReleased() {
    if (s_pressed) {
        x1 = mouseX;
        y1 = mouseY;
        selection = new Selection(x0, y0, x1, y1);
        drawing_selection = false;
    }
    if (d_pressed) {
        x1 = mouseX;
        y1 = mouseY;

        let min_x = min(x0, x1);
        let min_y = min(y0, y1);
        let max_x = max(x0, x1);
        let max_y = max(y0, y1);

        // delete all observations within the drawn rectangle
        relevant = relevant.filter(p => {
            return !((p.x >= min_x && p.x <= max_x) && (p.y >= min_y && p.y <= max_y));
        })
        irrelevant = irrelevant.filter(p => {
            return !((p.x >= min_x && p.x <= max_x) && (p.y >= min_y && p.y <= max_y));
        })

        // trigger recalculation of metrics
        selection.calculate_metrics();
        deleting_observations = false;
    }

    noLoop();
    redraw();
}

function keyTyped() {
    if (key === "s" || key === "S") {
        s_pressed = !s_pressed;
        a_pressed = false;
        d_pressed = false;

        if (s_pressed) {
            draw_selection_text.addClass("ui-active");
            add_observations_text.removeClass("ui-active");
            delete_observations_text.removeClass("ui-active");
        } else {
            draw_selection_text.removeClass("ui-active");
        }
    }
    if (key === "d" || key === "D") {
        d_pressed = !d_pressed;
        a_pressed = false;
        s_pressed = false;

        if (d_pressed) {
            delete_observations_text.addClass("ui-active");
            add_observations_text.removeClass("ui-active");
            draw_selection_text.removeClass("ui-active");
        } else {
            delete_observations_text.removeClass("ui-active");
        }
    }
    if (key === "a" || key === "A") {
        a_pressed = !a_pressed;
        d_pressed = false;
        s_pressed = false;

        if (a_pressed) {
            add_observations_text.addClass("ui-active");
            delete_observations_text.removeClass("ui-active");
            draw_selection_text.removeClass("ui-active");
        } else {
            add_observations_text.removeClass("ui-active");
        }
    }

    redraw();
}
