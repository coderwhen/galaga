class Bezier {
    constructor(point, unit) {
        this.point = point;
        this.unit = unit;
    }

    excute() {
        const points = []
        let t = 0;
        for (let i = 0; i < 120; i++) {
            t = i / 120;
            let point = this.calculate(this.points, t);
            points.push(point)
        }
        return points
    }

    calculate(points, t) {
        if (points.length <= 2) {
            return {
                x: (1 - t) * points[0].x + t * points[1].x,
                y: (1 - t) * points[0].y + t * points[1].y
            }
        } else {
            let dropPoints = [];
            for (let i = 0; i < points.length - 1; i++) {
                dropPoints.push(this.calculate([
                    points[i],
                    points[i + 1]
                ], t))
            }
            return this.calculate(dropPoints, t)
        }
    }
}

export { Bezier }
export default Bezier