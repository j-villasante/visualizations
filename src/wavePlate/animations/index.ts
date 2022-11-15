export type Inputs = {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    gamma: number
    theta: number
    scale: number
}

export class Parameters {
    w: number
    E_0x: number
    E_0y: number
    phi: number
    scale: number
    gamma: number
    private _theta: number
    private _zPos: number

    constructor(inputs: Inputs) {
        this.w = inputs.w
        this.E_0x = inputs.E_0x
        this.E_0y = inputs.E_0y
        this.phi = inputs.phi
        this.scale = inputs.scale
        this.gamma = inputs.gamma
        this._theta = inputs.theta
        this._zPos = 0
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
    tickZPos() {
        if (this._zPos === 1000) {
            this._zPos = 0
        } else {
            this._zPos += 1
        }
    }
}

export { setupPolarizedField } from "./polarized"
export { setupPositionAnimation } from "./position"
export { setupRetardedField } from "./retarded"
