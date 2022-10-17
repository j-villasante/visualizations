import type { Parameters } from "./parameters"
import { CartesianSpace } from "./ext"
import { Pt } from "pts"

export function setupPolarizedField(params: Parameters): CartesianSpace {
    const space = new CartesianSpace("#regular").setup({
        pixelDensity: 2,
        bgcolor: "#ffffff",
    })
    const form = space.getForm()

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#000", 0.1).drawGrid(params.scale)
        form.strokeOnly("#000", 1).drawAxis(space.center)

        const t = time / 1000
        const E = new Pt(
            params.E_0x * Math.cos(params.w * t),
            params.E_0y * Math.cos(params.w * t + params.phi),
        ).$multiply(params.scale)

        form.stroke("#9d0000ff", 2)
            .fill("#9d0000ff")
            .drawArrowLines(
                [
                    [space.center, space.center.$add(0, E.y)],
                    [space.center, space.center.$add(E.x, 0)],
                ],
                3,
            )
        form.stroke("#000", 3)
            .fill("#000")
            .drawArrowLine([space.center, space.center.$add(E)], 4)
    })
    return space
}
