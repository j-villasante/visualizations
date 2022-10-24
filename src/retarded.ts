import type { Parameters } from "./parameters"
import { CartesianSpace } from "./ext"
import { Mat, Pt, Vec } from "pts"

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
        const E = new Pt(
            p.E_0x * Math.cos(p.w * t),
            p.E_0y * Math.cos(p.w * t + p.phi),
        ).$multiply(p.scale)
        const E_r = new Pt(
            p.E_0x * Math.cos(p.w * t - p.retardation * Math.PI),
            p.E_0y * Math.cos(p.w * t + p.phi - p.retardation * Math.PI),
        ).$multiply(p.scale)

        // Second axis
        const angle = p.retAngle
        form.strokeOnly("#FF0000", 1).drawAxis(space.center, angle)

        const a = Mat.rotate2DMatrix(Math.cos(-angle), Math.sin(-angle))
        const rPtx = Mat.transform2D(
            [Vec.dot(E_r, [Math.cos(angle), Math.sin(angle)]), 0],
            a,
        )
        const rPty = Mat.transform2D(
            [0, Vec.dot(E, [-Math.sin(angle), Math.cos(angle)])],
            a,
        )
        form.stroke("#FF9722", 2)
            .fill("#FF9722")
            .drawArrowLines(
                [
                    [space.center, space.center.$add(rPtx)],
                    [space.center, space.center.$add(rPty)],
                ],
                3,
            )
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
        // Time
        form.fill("#fff")
            .font(13)
            .text([10, space.height - 10], (time / 1000).toFixed(1) + "s")
    })
    return space
}
