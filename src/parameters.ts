declare const MathJax

export class Parameters {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    scale: number
    retardation: number
    retAngle: number

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
        this.scale = 100
        this.retardation = 1
        this.retAngle = 0

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
        this.retardationElem.value = this.retardation.toString()
        this.retAngleElem.value = this.retAngle.toString()

        document
            .getElementById("apply-button")
            ?.addEventListener("click", () => this.apply())
        const enterHandler = (e: KeyboardEvent) => {
            ;(e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown") && this.apply()
        }
        this.freqElem.addEventListener("keyup", enterHandler)
        this.E_0xElem.addEventListener("keyup", enterHandler)
        this.E_0yElem.addEventListener("keyup", enterHandler)
        this.phiElem.addEventListener("keyup", enterHandler)
        this.scaleElem.addEventListener("keyup", enterHandler)
        this.retardationElem.addEventListener("keyup", enterHandler)
        this.retAngleElem.addEventListener("keyup", enterHandler)
    }

    apply() {
        this.w = parseNumber(this.freqElem.value, 1)
        this.E_0x = parseNumber(this.E_0xElem.value, 1)
        this.E_0y = parseNumber(this.E_0yElem.value, 1)
        this.phi = parseNumber(this.phiElem.value, 0)
        this.scale = parseNumber(this.scaleElem.value, 100)
        this.retardation = parseNumber(this.retardationElem.value, 0)
        this.retAngle = parseNumber(this.retAngleElem.value, 0)

        this.render()
    }

    render() {
        const el = document.getElementById("pol-eq")
        if (!el) return
        const eq = `$$\\vec{E}=${this.E_0x === 1 ? "" : this.E_0x}\\cos(${
            this.w === 1 ? "" : this.w
        }t)\\vec{u}_x + ${this.E_0y === 1 ? "" : this.E_0y}\\cos(${
            this.w === 1 ? "" : this.w
        }t ${this.phi ? "+" + this.phi : ""})\\vec{u}_y$$`
        el.innerHTML = eq
        MathJax.typeset()
    }
}

function parseNumber(value: string, def: number): number {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) return def
    return parsed
}
