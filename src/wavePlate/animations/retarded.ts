import type { Parameters } from "."
import { CartesianSpace } from "../../ext"
import { Mat, Pt, Vec } from "pts"

type Options = {
    type?: "in-transit";
    elementId: string;
    bgColor?: string;
}

export function setupRetardedField(p: Parameters, options: Options): CartesianSpace {
    const { elementId, type, bgColor } = options;
    const space = new CartesianSpace(elementId).setup({
        pixelDensity: 2,
        bgcolor: bgColor || "#04121f",
    })
    const form = space.getForm()

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#fff", 0.1).drawGrid(p.scale / 5)
        form.strokeOnly("#fff", 1).drawAxis(space.center)

        const t = time / 1000
        // Create the normal field
        const E = new Pt(
            p.E_0x * Math.cos(p.w * t),
            p.E_0y * Math.cos(p.w * t + p.phi),
        ).$multiply(p.scale)
        // Create a retarded field
        let retZ = type === "in-transit" ? p.zPos : 1;
        if (retZ < 0) {
            retZ = 0
        } else if (retZ > 1) {
            retZ = 1
        }
        const E_r = new Pt(
            p.E_0x * Math.cos(p.w * t - p.gamma * retZ),
            p.E_0y * Math.cos(p.w * t + p.phi - p.gamma * retZ),
        ).$multiply(p.scale)

        const angle = p.theta
        // Second axis
        form.strokeOnly("#FF0000", 1).drawAxis(space.center, angle)

        // Find the values x' and y' on a rotated (by angle) axis
        const x_ = Vec.dot(E_r, [Math.cos(angle), Math.sin(angle)])
        const y_ = Vec.dot(E, [-Math.sin(angle), Math.cos(angle)])

        // Rotate the vectors (x', 0) and (0, y') back to a the main coordinate
        // system and make y := -y since the canvas axis is upside down.
        const a = Mat.rotate2DMatrix(Math.cos(angle), Math.sin(angle))
        const x_r = Mat.transform2D([x_, 0], a).$multiply(1, -1)
        const y_r = Mat.transform2D([0, y_], a).$multiply(1, -1)

        // Draw the components of the rotated axis.
        form.stroke("#FF9722", 2)
            .fill("#FF9722")
            .drawArrowLines(
                [
                    [space.center, space.center.$add(x_r)],
                    [space.center, space.center.$add(y_r)],
                ],
                3,
            )
        
        // Draw the electric field vector.
        form.stroke("#fff", 3)
            .fill("#fff")
            .drawArrowLine([space.center, space.center.$add(x_r).$add(y_r)], 4)

        // Label
        const d = 0.32 * space.width
        form.fill("#fff")
            .font(12)
            .text(
                space.center.$add(d * Math.cos(angle), -d * Math.sin(angle)),
                "Slow axis",
            )
        // Time
        form.fill("#fff")
            .font(13)
            .text([10, space.height - 10], (time / p.timeScale).toFixed(2) + " fs")
    })
    return space
}
