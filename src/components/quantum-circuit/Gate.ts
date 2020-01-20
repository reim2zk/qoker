import * as qbit from './Qbit'

export enum GateType {H, X, Y, Z, CN}

class GatePart {
    gate: Gate
    indexPart: number
    constructor(gate: Gate, indexPart: number) {
        this.gate = gate
        this.indexPart = indexPart
    }
    setPosition(i: number, j: number): void {
        this.gate.setPosition(i, j, this.indexPart) 
    }
}

export interface Gate {
    getType(): GateType
    findPart(i: number, j: number): GatePart | null
    setPosition(i: number, j: number, indexPart: number): void
}

export class OneGate implements Gate {
    i: number
    j: number
    type: GateType
    static INDEX_PART = 1
    constructor(i: number, j: number, type: GateType) {
        this.i = i
        this.j = j
        this.type = type
    }
    getType(): GateType { return this.type }
    findPart(i: number, j: number): GatePart | null {
        if(i == this.i && j == this.j) {
            return new GatePart(this, OneGate.INDEX_PART)
        } else {
            return null
        }
    }
    setPosition(i: number, j: number, indexPart: number): void {
        if(OneGate.INDEX_PART == indexPart) {
            this.i = i
            this.j = j
        } 
    }
}

export class CNotGate implements Gate {
    iControl: number
    iTarget: number
    j: number
    static INDEX_CONTROL = 1
    static INDEX_TARGET = 2
    constructor(iControl: number, iTarget: number, j: number) {
        this.iControl = iControl
        this.iTarget = iTarget
        this.j = j
    }
    getType(): GateType { return GateType.CN }
    findPart(i: number, j: number): GatePart | null {
        if(j == this.j && i == this.iTarget) {
            return new GatePart(this, CNotGate.INDEX_TARGET)
        } else if(j == this.j && i == this.iControl) {
            return new GatePart(this, CNotGate.INDEX_CONTROL)
        } else {
            return null
        }
    }
    setPosition(i: number, j: number, indexPart: number): void {
        if(j == this.j && i == this.iTarget) {
            this.iTarget = i
            this.j = j
        } else if(j == this.j && i == this.iControl) {
            this.iControl = i
            this.j = j
        }
    }    
}