import React from "react"
import { CartesianSpace } from "../ext"

function setup() {
    const space = new CartesianSpace("regular").setup({
        pixelDensity: 2,
        bgcolor: "#04121f",
    })
    const form = space.getForm()

    const dx = 0.04
    const dx2 = dx ** 2
    const k0 = 5.5 * Math.PI
    const dt = dx2
    const xmax = 6.0
    const xs: number[] = []
    for (let i = -xmax; i < xmax + dx / 2; i += dx) xs.push(i)

    let psr = xs.map((x) => Math.exp(-0.5 * (x / 0.5) ** 2) * Math.cos(k0 * x))
    let psi = xs.map((x) => Math.exp(-0.5 * (x / 0.5) ** 2) * Math.sin(k0 * x))
    const v = xs.map((x) => 15 * x ** 2)

    space.add((time) => {
        if (!time) return

        form.strokeOnly("#fff", 0.1).drawGrid(20)

        psr = psr.map((p, i) => {
            if (i === 0 || i === psr.length - 1) return p
            return (
                p -
                (dt / dx) * (psi[i + 1] + psi[i - 1] - 2 * psi[i]) +
                dt * v[i] * psi[i]
            )
        })
        psi = psi.map((p, i) => {
            if (i === 0 || i === psr.length - 1) return p
            return (
                p +
                (dt / dx) * (psr[i + 1] + psr[i - 1] - 2 * psr[i]) -
                dt * v[i] * psr[i]
            )
        })
        const r = []
        for (let i = 0; i < psr.length; i++)
            r.push([xs[i] * 10 + 100, 10*4 * (psr[i] ** 2 + psi[i] ** 2)])
		
		form.strokeOnly("white", 1).line(r)
    })

    space.play()
}

export const Harmonic = () => {
    React.useEffect(setup, [])

    return (
        <div>
            <canvas className="field" id="regular"></canvas>
        </div>
    )
}
