declare const MathJax

import { round, evaluate } from "mathjs"

export class Parameters {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    scale: number
    retardation: number
    retAngle: number
    private _retZ: number

    private freqElem: HTMLInputElement
    private E_0xElem: HTMLInputElement
    private E_0yElem: HTMLInputElement
    private phiElem: HTMLInputElement
    private scaleElem: HTMLInputElement
    private retardationElem: HTMLInputElement
    private retAngleElem: HTMLInputElement

    constructor() {
        this.w = 1
        this.E_0x = 1
        this.E_0y = 1
        this.phi = 0
        this.scale = 75
        this.retardation = Math.PI
        this.retAngle = 0
        this._retZ = 0

        this.freqElem = document.getElementById("frequency") as HTMLInputElement
        this.E_0xElem = document.getElementById("e_0x") as HTMLInputElement
        this.E_0yElem = document.getElementById("e_0y") as HTMLInputElement
        this.phiElem = document.getElementById("phi") as HTMLInputElement
        this.scaleElem = document.getElementById("scale") as HTMLInputElement
        this.retardationElem = document.getElementById(
            "retardation",
        ) as HTMLInputElement
        this.retAngleElem = document.getElementById(
            "retAngle",
        ) as HTMLInputElement

        this.freqElem.value = this.w.toString()
        this.E_0xElem.value = this.E_0x.toString()
        this.E_0yElem.value = this.E_0y.toString()
        this.phiElem.value = this.phi.toString()
        this.scaleElem.value = this.scale.toString()
        this.retardationElem.value = "pi"
        this.retAngleElem.value = (0).toString()

        document
            .getElementById("apply-button")
            ?.addEventListener("click", () => this.apply())
        const enterHandler = () => this.apply()
        this.freqElem.addEventListener("change", enterHandler)
        this.E_0xElem.addEventListener("change", enterHandler)
        this.E_0yElem.addEventListener("change", enterHandler)
        this.phiElem.addEventListener("change", enterHandler)
        this.scaleElem.addEventListener("change", enterHandler)
        this.retardationElem.addEventListener("change", enterHandler)
        this.retAngleElem.addEventListener("change", enterHandler)

        setInterval(() => {
            if (this._retZ === 1000) {
                this._retZ = 0
            } else {
                this._retZ += 1
            }
        }, 10)
    }

    apply() {
        this.w = evaluate(this.freqElem.value)
        this.E_0x = evaluate(this.E_0xElem.value)
        this.E_0y = evaluate(this.E_0yElem.value)
        this.phi = evaluate(this.phiElem.value)
        this.scale = evaluate(this.scaleElem.value)
        this.retardation = evaluate(this.retardationElem.value)
        this.retAngle = (evaluate(this.retAngleElem.value) * Math.PI) / 180

        this.render()
    }

    render() {
        const el = document.getElementById("pol-eq")
        if (!el) return
        const eq = `$$\\vec{E} = e^{i${
            this.w === 1 ? "" : this.w
        }t}\\begin{pmatrix} ${this.E_0x} \\\\ ${
            this.E_0y === 1 && this.phi !== 0 ? "" : this.E_0y
        }${
            this.phi === 0 ? "" : `e^{${this.phi === 1 ? "" : this.phi}i}`
        } \\end{pmatrix}$$`

        const theta = Math.atan2(this.E_0y, this.E_0x)
        const s1 = round(Math.cos(2 * theta), 2)
        const s2 = round(Math.sin(2 * theta) * Math.cos(this.phi), 2)
        const s3 = round(Math.sin(2 * theta) * Math.sin(this.phi), 2)
        console.log(s1, s2, s3)

        const qel = document.getElementById("quantum-eq")
        if (!qel) return
        const q_eq = `$$
        \\rho=\\frac{1}{2}(1
        ${
            s1 === 0
                ? ""
                : `${s1 < 0 ? "-" : "+"} ${
                      Math.abs(s1) === 1 ? "" : Math.abs(s1)
                  } \\sigma_1`
        }
        ${
            s2 === 0
                ? ""
                : `${s2 < 0 ? "-" : "+"} ${
                      Math.abs(s2) === 1 ? "" : Math.abs(s2)
                  } \\sigma_2`
        }
        ${
            s3 === 0
                ? ""
                : `${s3 < 0 ? "-" : "+"} ${
                      Math.abs(s3) === 1 ? "" : Math.abs(s3)
                  } \\sigma_3`
        }
        )
        $$`

        el.innerHTML = eq
        qel.innerHTML = q_eq
        MathJax.typeset()
    }

    get retZ() {
        return this._retZ / 1000
    }
}
