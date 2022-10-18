import type { Parameters } from "./parameters"
import { CartesianSpace } from "./ext"
import { Pt } from "pts"

export function setupPolarizedField(p: Parameters): CartesianSpace {
    const space = new CartesianSpace("#regular").setup({
        pixelDensity: 2,
        bgcolor: "#04121f",
    })
    const form = space.getForm()

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#fff", 0.2).drawGrid(p.scale)
        form.strokeOnly("#fff", 1).drawAxis(space.center)

        const t = time / 1000
        const E = new Pt(
            p.E_0x * Math.cos(p.w * t),
            p.E_0y * Math.cos(p.w * t + p.phi),
        ).$multiply(p.scale)

        form.stroke("#9d0000ff", 2)
            .fill("#9d0000ff")
            .drawArrowLines(
                [
                    [space.center, space.center.$add(0, E.y)],
                    [space.center, space.center.$add(E.x, 0)],
                ],
                3,
            )
        form.stroke("#fff", 3)
            .fill("#fff")
            .drawArrowLine([space.center, space.center.$add(E)], 4)
    })
    return space
}
