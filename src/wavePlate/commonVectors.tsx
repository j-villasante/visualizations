import { evaluate } from "mathjs"
import React from "react"
import { Evaluations, Inputs } from "./animations"

type Props = {
    setInputs: React.Dispatch<React.SetStateAction<Inputs>>
    setEvaluations: React.Dispatch<React.SetStateAction<Evaluations>>
}

type RowOptions = {
    E_0x: string
    E_0y: string
    phi: string
}

export const CommonVectors = (props: Props) => {
    const { setInputs, setEvaluations } = props

    function applyVector(opts: RowOptions) {
        setInputs((inputs) => ({
            ...inputs,
            E_0x: opts.E_0x,
            E_0y: opts.E_0y,
            phi: opts.phi,
        }))
        setEvaluations((e) => ({
            ...e,
            E_0x: evaluate(opts.E_0x),
            E_0y: evaluate(opts.E_0y),
            phi: evaluate(opts.phi),
        }))
    }

    return (
        <div>
            <h2>Common Jones vectors</h2>
            <div id="common-vectors">
                <div className="header">Polarization</div>
                <div className="header">Polarization Vector</div>
                <div className="header">Jones Vector</div>
                <div></div>
                <div>Horizontal</div>
                <div>{"$$\\vec\\varepsilon_H$$"}</div>
                <div>{"$$\\begin{pmatrix}1\\\\0\\end{pmatrix}$$"}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "1",
                                E_0y: "0",
                                phi: "0",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>Vertical</div>
                <div>{"$$\\vec\\varepsilon_V$$"}</div>
                <div>{"$$\\begin{pmatrix}0\\\\1\\end{pmatrix}$$"}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "0",
                                E_0y: "1",
                                phi: "0",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>+45° linear</div>
                <div>{`$$\\vec\\varepsilon_{+45}=\\frac{1}{\\sqrt{2}}(\\vec\\varepsilon_H+\\vec\\varepsilon_V)$$`}</div>
                <div>{`$$\\frac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\1\\end{pmatrix}$$`}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "1/sqrt(2)",
                                E_0y: "1/sqrt(2)",
                                phi: "0",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>–45° linear</div>
                <div>{`$$\\vec\\varepsilon_{-45}=\\frac{1}{\\sqrt{2}}(\\vec\\varepsilon_H-\\vec\\varepsilon_V)$$`}</div>
                <div>{`$$\\frac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\-1\\end{pmatrix}$$`}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "1/sqrt(2)",
                                E_0y: "-1/sqrt(2)",
                                phi: "0",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>Linear at angle θ w.r.t. horizontal</div>
                <div>{`$$\\vec\\varepsilon_\\theta=\\cos{\\theta}\\vec\\varepsilon_H+\\sin{\\theta}\\vec\\varepsilon_V$$`}</div>
                <div>{`$$\\begin{pmatrix}\\cos\\theta\\\\\\sin\\theta\\end{pmatrix}$$`}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "cos(pi/5)",
                                E_0y: "sin(pi/5)",
                                phi: "0",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>Left circular</div>
                <div>{`$$\\vec\\varepsilon_{L}=\\frac{1}{\\sqrt{2}}(\\vec\\varepsilon_H+i\\vec\\varepsilon_V)$$`}</div>
                <div>{`$$\\frac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\i\\end{pmatrix}$$`}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "1",
                                E_0y: "1",
                                phi: "-pi/2",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
                <div>Right circular</div>
                <div>{`$$\\vec\\varepsilon_{R}=\\frac{1}{\\sqrt{2}}(\\vec\\varepsilon_H-i\\vec\\varepsilon_V)$$`}</div>
                <div>{`$$\\frac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\-i\\end{pmatrix}$$`}</div>
                <div>
                    <button
                        onClick={() =>
                            applyVector({
                                E_0x: "1",
                                E_0y: "1",
                                phi: "pi/2",
                            })
                        }
                    >
                        Show
                    </button>
                </div>
            </div>
        </div>
    )
}
