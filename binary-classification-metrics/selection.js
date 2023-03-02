class Selection {
    constructor(x0, y0, x1, y1) {
        this.x0 = min(x0, x1);
        this.y0 = min(y0, y1);
        this.x1 = max(x0, x1);
        this.y1 = max(y0, y1);

        this.calculate_metrics();
    }

    calculate_metrics() {
        // count the points that are selected
        this.true_positive = 0;
        this.true_negative = 0;
        this.false_positive = 0;
        this.false_negative = 0;

        relevant.forEach(p => {
            if ((p.x >= this.x0 && p.x <= this.x1) && (p.y >= this.y0 && p.y < this.y1)) {
                p.selected = true;
                this.true_positive++;
            } else {
                p.selected = false;
                this.false_negative++;
            }
        })

        irrelevant.forEach(p => {
            if ((p.x >= this.x0 && p.x <= this.x1) && (p.y >= this.y0 && p.y < this.y1)) {
                p.selected = true;
                this.false_positive++;
            } else {
                p.selected = false;
                this.true_negative++;
            }
        })

        // calculate metrics
        this.accuracy = (this.true_positive + this.true_negative) / (relevant.length + irrelevant.length);
        this.accuracy = isNaN(this.accuracy) ? 0 : this.accuracy;
        this.precision = this.true_positive / (this.true_positive + this.false_positive);
        this.precision = isNaN(this.precision) ? 0 : this.precision;
        this.recall = this.true_positive / relevant.length;
        this.recall = isNaN(this.recall) ? 0 : this.recall;
        this.f_score = 2 * this.precision * this.recall / (this.precision + this.recall);
        this.f_score = isNaN(this.f_score) ? 0 : this.f_score;
        this.sensitivity = this.true_positive / relevant.length;
        this.sensitivity = isNaN(this.sensitivity) ? 0 : this.sensitivity;
        this.specificity = this.true_negative / irrelevant.length;
        this.specificity = isNaN(this.specificity) ? 1 : this.specificity;
    }

    render() {
        push();
        noStroke()
        if (this.x1 < windowWidth / 2) {
            // this is the case when the whole selection is on the left
            fill(210, 244, 178);
            rect(this.x0, this.y0, this.x1, this.y1);
        } else if (this.x0 > windowWidth / 2) {
            // this is the case when the whole selection is on the right
            fill(244, 181, 174);
            rect(this.x0, this.y0, this.x1, this.y1);
        } else {
            // this is the normal case, when the selection crosses the middle
            fill(210, 244, 178);
            rect(this.x0, this.y0, windowWidth / 2, this.y1);
            fill(244, 181, 174);
            rect(windowWidth / 2, this.y0, this.x1, this.y1);
        }
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(this.x0, this.y0, this.x1, this.y1);
        pop();
    }
}
