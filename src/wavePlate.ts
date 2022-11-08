import type { Parameters } from "./parameters"
import { CanvasSpace, Circle, Pt } from "pts"

export function setupWavePlate(p: Parameters): CanvasSpace {
    const space = new CanvasSpace("#wave-plate").setup({
        pixelDensity: 2,
        bgcolor: "#04121f",
    })
    const form = space.getForm()
    const margin = 75

    space.add((time) => {
        if (!time) return

        form.strokeOnly("red").lines([
            [new Pt(margin, 0), new Pt(margin, space.height)],
            [
                new Pt(space.width - margin, 0),
                new Pt(space.width - margin, space.height),
            ],
        ])
        const wp = space.width - (2 * margin);
        const circle = Circle.fromCenter([margin + wp * p.retZ, space.center.y], 5);
        form.fill("red").circle(circle)

        form.fill("#fff")
            .font(13)
            .text([10, space.height - 10], p.retZ.toFixed(2))
    })
    return space
}
