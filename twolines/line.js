function Line(config) {
    this.f = config.f;
    this.colors = config.colors;

    this.draw = function() {
        let x1 = -1;
        let y1 = this.f(x1);
        let x2 = 1;
        let y2 = this.f(x2);

        stroke(255);
        line(mapX(x1), mapY(y1), mapX(x2), mapY(y2));
    }

    this.getPositionValue = function (x, y) {
        let ly = this.f(x);

        return (y > ly) ? 0 : 1;
    }
}
