import { CanvasForm, Pt, PtIterable, CanvasSpace, Line } from "pts"

export class CartesianForm extends CanvasForm {
    drawGrid(density: number) {
        const gridLines: Pt[][] = []
        for (
            let i = this.space.center.x % density;
            i < this.space.width;
            i += density
        ) {
            gridLines.push([new Pt(i, 0), new Pt(i, this.space.height)])
        }
        for (
            let i = this.space.center.y % density;
            i < this.space.height;
            i += density
        ) {
            gridLines.push([new Pt(0, i), new Pt(this.space.width, i)])
        }
        this.lines(gridLines)
    }

    drawAxis(center: Pt, angle = 0) {
        this.lines([
            [
                new Pt(center.x - center.y * Math.tan(angle), 0),
                new Pt(
                    center.x + center.y * Math.tan(angle),
                    this.space.height,
                ),
            ],
            [
                new Pt(0, center.y + center.x * Math.tan(angle)),
                new Pt(
                    this.space.height,
                    center.y - center.x * Math.tan(angle),
                ),
            ],
        ])
    }

    drawArrowLine(pts: PtIterable, tipSize = 2) {
        this.line(pts).polygon(Line.marker(pts, new Pt(tipSize, tipSize * 2)))
    }

    drawArrowLines(pts: PtIterable[], tipSize = 2) {
        pts.forEach((i) => this.drawArrowLine(i, tipSize))
    }
}

export class CartesianSpace extends CanvasSpace {
    getForm(): CartesianForm {
        return new CartesianForm(this)
    }
}
