class Observation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    render() {
        push();
        if (this.x < windowWidth / 2) {
            fill(130, 130, 130);
            noStroke();
        } else {
            noFill();
            stroke(130, 130, 130);
            strokeWeight(4);
        }
        circle(this.x, this.y, 9);

        if (this.selected) {
            stroke(0);
            strokeWeight(1);
            circle(this.x, this.y, 9);
        }
        pop();
    }
}

