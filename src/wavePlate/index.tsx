import React from "react"
import {
    Inputs,
    Parameters,
    setupPolarizedField,
    setupPositionAnimation,
    setupRetardedField,
} from "./animations"
import { round, evaluate } from "mathjs"
import { MathJax } from "better-react-mathjax"

export const WavePlate = () => {
    const [inputs, setInputs] = React.useState<Inputs>({
        w: 1,
        E_0x: 1,
        E_0y: 1,
        phi: 0,
        scale: 75,
        gamma: Math.PI,
        theta: 0,
    })
    const { current: params } = React.useRef<Parameters>(new Parameters(inputs))

    React.useEffect(() => {
        const polarizedSpace = setupPolarizedField(params)
        const retardedSpace = setupRetardedField(params, {
            elementId: "#retarded",
        })
        const inTransitSpace = setupRetardedField(params, {
            elementId: "#in-transit",
            type: "in-transit",
        })
        const wavePlateSpace = setupPositionAnimation(params)

        polarizedSpace.play()
        retardedSpace.play()
        inTransitSpace.play()
        wavePlateSpace.play()

        setInterval(() => {
            params.tickZPos()
        }, 10)
    }, [])

    React.useEffect(() => {
        for (const [key, value] of Object.entries(inputs)) {
            params[key] = value
        }
    }, [inputs])

    function updateParams(input: Partial<Parameters>): void {
        setInputs((p) => ({
            ...p,
            ...input,
        }))
    }

    function onInputEnter(
        e: React.KeyboardEvent<HTMLInputElement>,
        key: keyof Parameters,
    ) {
        if (e.key !== "Enter") return
        updateParams({ [key]: evaluate(e.currentTarget.value) })
    }

    function sTerm(s: number): string {
        return s === 0
            ? ""
            : `${s < 0 ? "-" : "+"} ${
                  Math.abs(s) === 1 ? "" : Math.abs(s)
              } \\sigma_1`
    }

    const theta = Math.atan2(inputs.E_0y, inputs.E_0x)
    const s1 = round(Math.cos(2 * theta), 2)
    const s2 = round(Math.sin(2 * theta) * Math.cos(inputs.phi), 2)
    const s3 = round(Math.sin(2 * theta) * Math.sin(inputs.phi), 2)

    console.log("rendered")

    return (
        <MathJax>
            <h1>Wave plate</h1>
            <div id="container">
                <div id="animations">
                    <div>
                        <div className="animation-label">Polarized light</div>
                        <canvas className="field" id="regular"></canvas>
                        <div id="pol-eq">{`$$
							\\vec{E} = e^{i${inputs.w === 1 ? "" : inputs.w}t}
							\\begin{pmatrix} 
							${inputs.E_0x} \\\\ 
							${inputs.E_0y === 1 && inputs.phi !== 0 ? "" : inputs.E_0y}
							${inputs.phi === 0 ? "" : `e^{${inputs.phi === 1 ? "" : inputs.phi}i}`} 
							\\end{pmatrix}
						$$`}</div>
                        <div id="quantum-eq">{`
							$$
							\\rho=\\frac{1}{2}(1${sTerm(s1)}${sTerm(s2)}${sTerm(s3)})
							$$
						`}</div>
                    </div>
                    <div>
                        <div className="animation-label">In-transit light</div>
                        <canvas className="field" id="in-transit"></canvas>
                        <canvas id="wave-plate"></canvas>
                    </div>
                    <div>
                        <div className="animation-label">Shifted light</div>
                        <canvas className="field" id="retarded"></canvas>
                    </div>
                </div>
                <h2>Parameters</h2>
                <div className="form">
                    <div className="form-col">
                        <div className="form-group">
                            <label htmlFor="e_0x">{"\\(E_{0x}\\)"}</label>
                            <input
                                type="text"
                                id="e_0x"
                                defaultValue={inputs.E_0x}
                                onKeyDown={(e) => onInputEnter(e, "E_0x")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="e_0y">{"\\(E_{0y}\\)"}</label>
                            <input
                                type="text"
                                id="e_0y"
                                defaultValue={inputs.E_0y}
                                onKeyDown={(e) => onInputEnter(e, "E_0y")}
                            />
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label htmlFor="frequency">\(\omega\)</label>
                            <input
                                type="text"
                                id="frequency"
                                defaultValue={inputs.w}
                                onKeyDown={(e) => onInputEnter(e, "w")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phi">\(\phi\)</label>
                            <input
                                type="text"
                                id="phi"
                                defaultValue={inputs.phi}
                                onKeyDown={(e) => onInputEnter(e, "phi")}
                            />
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label htmlFor="gamma">\(\Gamma\)</label>
                            <input
                                type="text"
                                id="gamma"
                                defaultValue="pi"
                                onKeyDown={(e) => onInputEnter(e, "gamma")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="retAngle">\(\theta\)</label>
                            <input
                                type="text"
                                id="retAngle"
                                defaultValue={inputs.theta}
                                onKeyDown={(e) => onInputEnter(e, "theta")}
                            />
                        </div>
                    </div>
                    <div className="form-col">
                        <button id="apply-button">Apply</button>
                        <button id="but-stop">Play/pause</button>
                    </div>
                </div>
            </div>
        </MathJax>
    )
}
