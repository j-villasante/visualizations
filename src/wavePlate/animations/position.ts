import type { Parameters } from "."
import { CanvasSpace, Circle, Pt } from "pts"

export function setupPositionAnimation(p: Parameters): CanvasSpace {
    const space = new CanvasSpace("#wave-plate").setup({
        pixelDensity: 2,
        bgcolor: "#04121f",
    })
    const form = space.getForm()
    const margin = 75

    space.add((time) => {
        if (!time) return

        form.fillOnly("#2a4f72").rect([
            new Pt(margin, 0),
            new Pt(space.width - margin, space.height + 1),
        ])
        const wp = space.width - 2 * margin
        const circle = Circle.fromCenter(
            [margin + wp * p.zPos, space.center.y],
            5,
        )
        form.fill("red").circle(circle)

        form.fill("#fff")
            .font(13)
            .text([10, space.height - 10], p.zPos.toFixed(2))
    })
    return space
}
