export type Evaluations = {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    gamma: number
    theta: number
    scale: number
    timeScale: number
}

export type Inputs = Omit<
    Record<keyof Evaluations, string>,
    "w" | "timeScale"
> & {
    frequency: string
    wavelength: string
}

export class Parameters {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    scale: number
    gamma: number
    timeScale: number
    private _theta: number
    private _zPos: number
    private _showTrace: boolean
    private _traceChangeListeners: ((v: boolean) => void)[]

    constructor(inputs: Evaluations) {
        this.w = inputs.w
        this.E_0x = inputs.E_0x
        this.E_0y = inputs.E_0y
        this.phi = inputs.phi
        this.scale = inputs.scale
        this.gamma = inputs.gamma
        this.timeScale = inputs.timeScale
        this._theta = inputs.theta
        this._zPos = -500
        this._showTrace = false
        this._traceChangeListeners = []
    }
    set theta(t: number) {
        this._theta = (t * Math.PI) / 180
    }
    get theta(): number {
        return this._theta
    }
    get zPos(): number {
        return this._zPos / 1000
    }
    get showTrace(): boolean {
        return this._showTrace
    }
    set showTrace(v: boolean) {
        this._showTrace = v
        for (const l of this._traceChangeListeners) {
            l(v)
        }
    }
    addTraceListener(l: (v: boolean) => void): void {
        this._traceChangeListeners.push(l)
    }
    tickZPos() {
        if (this._zPos === 1500) {
            this._zPos = -500
        } else {
            this._zPos += 1
        }
    }
}

export { setupPolarizedField } from "./polarized"
export { setupPositionAnimation } from "./position"
export { setupRetardedField } from "./retarded"
