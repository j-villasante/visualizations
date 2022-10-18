import type { Parameters } from "./parameters"
import { CartesianSpace } from "./ext"
import { Mat, Pt } from "pts"

export function setupRetardedField(p: Parameters): CartesianSpace {
    const space = new CartesianSpace("#retarded").setup({
        pixelDensity: 2,
        bgcolor: "#04121f",
    })
    const form = space.getForm()

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#fff", 0.2).drawGrid(p.scale)
        form.strokeOnly("#fff", 1).drawAxis(space.center)

        const t = time / 1000
        const rt = t - p.retardation
        const E = new Pt(
            p.E_0x * Math.cos(p.w * t),
            p.E_0y * Math.cos(p.w * t + p.phi),
        ).$multiply(p.scale)
        const E_r = new Pt(
            p.E_0x * Math.cos(p.w * rt),
            p.E_0y * Math.cos(p.w * rt + p.phi),
        ).$multiply(p.scale)

        // Second axis
        const angle = p.retAngle
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
        form.stroke("#fff", 3)
            .fill("#fff")
            .drawArrowLine(
                [space.center, space.center.$add(rPtx).$add(rPty)],
                4,
            )

        // Label
        const d = 0.35 * space.width
        form.fill("#fff")
            .font(13)
            .text(
                space.center.$add(d * Math.cos(angle), -d * Math.sin(angle)),
                "Slow axis",
            )
    })
    return space
}
