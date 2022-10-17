import type { Parameters } from "./parameters"
import { CartesianSpace } from "./ext"
import { Mat, Pt } from "pts"

export function setupRetardedField(params: Parameters): CartesianSpace {
    const space = new CartesianSpace("#retarded").setup({
        pixelDensity: 2,
        bgcolor: "#ffffff",
    })
    const form = space.getForm()

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#000", 0.1).drawGrid(params.scale)
        form.strokeOnly("#000", 1).drawAxis(space.center)

        const t = time / 1000
        const rt = t - params.retardation
        const E = new Pt(
            params.E_0x * Math.cos(params.w * t),
            params.E_0y * Math.cos(params.w * t + params.phi),
        ).$multiply(params.scale)
        const E_r = new Pt(
            params.E_0x * Math.cos(params.w * rt),
            params.E_0y * Math.cos(params.w * rt + params.phi),
        ).$multiply(params.scale)

        // Second axis
        const angle = params.retAngle
        form.strokeOnly("red", 1).drawAxis(space.center, angle)

        const a = Mat.rotate2DMatrix(Math.cos(-angle), Math.sin(-angle))
        const b = Mat.rotate2DMatrix(Math.cos(angle), Math.sin(angle))
        const rPtx = Mat.transform2D([Mat.transform2D(E_r, b).x, 0], a)
        const rPty = Mat.transform2D([0, Mat.transform2D(E, b).y], a)
        form.stroke("#5541FF", 2)
            .fill("#5541FF")
            .drawArrowLines([
                [space.center, space.center.$add(rPtx)],
                [space.center, space.center.$add(rPty)],
            ])
        form.stroke("#000", 3)
            .fill("#000")
            .drawArrowLine(
                [space.center, space.center.$add(rPtx).$add(rPty)],
                4,
            )

        // Label
        const d = 240
        form.fill("#000")
            .font(13)
            .text(
                space.center.$add(d * Math.cos(angle), -d * Math.sin(angle)),
                "Slow axis",
            )
    })
    return space
}
