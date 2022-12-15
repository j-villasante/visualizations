import { MathJax } from "better-react-mathjax"
import { evaluate, pi, round } from "mathjs"
import { CanvasSpace } from "pts"
import React from "react"
import {
    Evaluations,
    Inputs,
    Parameters,
    setupPolarizedField,
    setupPositionAnimation,
    setupRetardedField,
} from "./animations"

type Spaces = Record<
    "polarized" | "retarded" | "inTransit" | "wavePlate",
    CanvasSpace
>

// Speed of light in km/s
const c = 299_792.458
// Frequency scale from which a time scale is derived
const freqScale = 600

export const WavePlate = () => {
    // Holds the raw values of each input
    const [inputs, setInputs] = React.useState<Inputs>({
        frequency: "600",
        wavelength: "500",
        E_0x: "1",
        E_0y: "1",
        phi: "0",
        scale: "75",
        gamma: "pi",
        theta: "0",
    })
    // Holds the evaluated values of each input. Updated on enter or on applied
    const [e, setEvaluations] = React.useState<Evaluations>({
        w: 1,
        E_0x: 1,
        E_0y: 1,
        phi: 0,
        scale: 75,
        gamma: Math.PI,
        theta: 0,
        timeScale: freqScale * 2 * pi,
    })
    // Holds the parameters used by the animations
    const { current: params } = React.useRef<Parameters>(new Parameters(e))
    // Spaces used to draw each of the animations
    const spacesRef = React.useRef<Spaces>()

    React.useEffect(() => {
        spacesRef.current = {
            polarized: setupPolarizedField(params),
            retarded: setupRetardedField(params, {
                elementId: "#retarded",
            }),
            inTransit: setupRetardedField(params, {
                elementId: "#in-transit",
                type: "in-transit",
                bgColor: "#2a4f72",
            }),
            wavePlate: setupPositionAnimation(params),
        }

        spacesRef.current.polarized.play()
        spacesRef.current.retarded.play()
        spacesRef.current.inTransit.play()
        spacesRef.current.wavePlate.play()

        setInterval(() => {
            params.tickZPos()
        }, 10)
    }, [])

    React.useEffect(() => {
        for (const [key, value] of Object.entries(e)) {
            params[key] = value
        }
    }, [e])

    function updateInputs(input: Partial<Inputs>): void {
        setInputs((p) => ({
            ...p,
            ...input,
        }))
    }

    function onInputEnter(
        event: React.KeyboardEvent<HTMLInputElement>,
        key: keyof Inputs,
    ) {
        if (event.key !== "Enter") return

        const value = evaluate(event.currentTarget.value)
        if (key === "frequency") {
            setEvaluations({
                ...e,
                w: value / freqScale,
            })
        } else if (key === "wavelength") {
            const f = c / value
            setEvaluations({
                ...e,
                w: f / freqScale,
            })
        } else {
            setEvaluations({
                ...e,
                [key]: value,
            })
        }
    }

    function onPlayPause() {
        if (!spacesRef.current) return
        spacesRef.current.polarized.pause(true)
        spacesRef.current.retarded.pause(true)
        spacesRef.current.inTransit.pause(true)
        spacesRef.current.wavePlate.pause(true)
    }

    function onWavelengthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const wavelength = evaluate(event.target.value)
        updateInputs({
            wavelength: event.target.value,
            frequency: round(c / wavelength, 4).toString(),
        })
    }

    function onFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
        const frequency = evaluate(event.target.value)
        updateInputs({
            frequency: event.target.value,
            wavelength: round(c / frequency, 4).toString(),
        })
    }

    function onApply() {
        setEvaluations({
            w: evaluate(inputs.frequency) / freqScale,
            E_0x: evaluate(inputs.E_0x),
            E_0y: evaluate(inputs.E_0y),
            phi: evaluate(inputs.phi),
            gamma: evaluate(inputs.gamma),
            theta: evaluate(inputs.theta),
            scale: evaluate(inputs.scale),
            timeScale: e.timeScale,
        })
    }

    function sTerm(s: number): string {
        return s === 0
            ? ""
            : `${s < 0 ? "-" : "+"} ${
                  Math.abs(s) === 1 ? "" : Math.abs(s)
              } \\sigma_1`
    }

    function onTraceToggle(event: React.ChangeEvent<HTMLInputElement>) {
        params.showTrace = event.target.checked
    }

    const theta = Math.atan2(e.E_0y, e.E_0x)
    const s1 = round(Math.cos(2 * theta), 2)
    const s2 = round(Math.sin(2 * theta) * Math.cos(e.phi), 2)
    const s3 = round(Math.sin(2 * theta) * Math.sin(e.phi), 2)

    return (
        <MathJax>
            <h1>Wave plate</h1>
            <div id="container">
                <div id="animations">
                    <div>
                        <div className="animation-label">
                            Input polarization
                        </div>
                        <canvas className="field" id="regular"></canvas>
                        <div id="pol-eq">{`$$
							\\vec{E} = e^{i${round(e.w * 1.2, 2)}\\times 10^{15} \\pi t}
							\\begin{pmatrix} 
							${e.E_0x} \\\\ 
							${e.E_0y === 1 && e.phi !== 0 ? "" : e.E_0y}
							${e.phi === 0 ? "" : `e^{${e.phi === 1 ? "" : round(e.phi, 2)}i}`} 
							\\end{pmatrix}
						$$`}</div>
                        <div id="quantum-eq">{`
							$$
							\\rho=\\frac{1}{2}(1${sTerm(s1)}${sTerm(s2)}${sTerm(s3)})
							$$
						`}</div>
                    </div>
                    <div>
                        <div className="animation-label">
                            Polarization along wave-plate
                        </div>
                        <canvas className="field" id="in-transit"></canvas>
                        <canvas id="wave-plate"></canvas>
                    </div>
                    <div>
                        <div className="animation-label">
                            Output polarization
                        </div>
                        <canvas className="field" id="retarded"></canvas>
                    </div>
                </div>
                <div className="form-title">Input light parameters</div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="e_0x">{"\\(E_{0x}\\)"}</label>
                        <input
                            type="text"
                            id="e_0x"
                            value={inputs.E_0x}
                            onChange={(e) =>
                                updateInputs({ E_0x: e.target.value })
                            }
                            onKeyDown={(e) => onInputEnter(e, "E_0x")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="e_0y">{"\\(E_{0y}\\)"}</label>
                        <input
                            type="text"
                            id="e_0y"
                            value={inputs.E_0y}
                            onChange={(e) =>
                                updateInputs({ E_0y: e.target.value })
                            }
                            onKeyDown={(e) => onInputEnter(e, "E_0y")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="frequency">Frequency (THz)</label>
                        <input
                            type="text"
                            id="frequency"
                            value={inputs.frequency}
                            onChange={onFrequencyChange}
                            onKeyDown={(e) => onInputEnter(e, "frequency")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wavelength">Wavelength (nm)</label>
                        <input
                            type="text"
                            id="wavelength"
                            value={inputs.wavelength}
                            onChange={onWavelengthChange}
                            onKeyDown={(e) => onInputEnter(e, "wavelength")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phi">\(\phi\)</label>
                        <input
                            type="text"
                            id="phi"
                            value={inputs.phi}
                            onChange={(e) =>
                                updateInputs({ phi: e.target.value })
                            }
                            onKeyDown={(e) => onInputEnter(e, "phi")}
                        />
                    </div>
                </div>
                <div className="form-title">Wave-plate parameters</div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="gamma">\(\Gamma\)</label>
                        <input
                            type="text"
                            id="gamma"
                            value={inputs.gamma}
                            onChange={(e) =>
                                updateInputs({ gamma: e.target.value })
                            }
                            onKeyDown={(e) => onInputEnter(e, "gamma")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="retAngle">\(\theta\)</label>
                        <input
                            type="text"
                            id="retAngle"
                            value={inputs.theta}
                            onChange={(e) =>
                                updateInputs({ theta: e.target.value })
                            }
                            onKeyDown={(e) => onInputEnter(e, "theta")}
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={onApply}>Apply</button>
                    <button onClick={onPlayPause}>Play/pause</button>
                    <label>Trace</label>
                    <input type="checkbox" onChange={onTraceToggle} />
                </div>
            </div>
            {/* <Explanation/> */}
        </MathJax>
    )
}
