import * as qbit from './Qbit'

export enum GateType {H, X, Y, Z, CN}

export class GatePart {
    gate: Gate
    indexPart: number
    i: number
    j: number
    constructor(gate: Gate, indexPart: number) {
        this.gate = gate
        this.indexPart = indexPart
        this.i = 0
        this.j = 0
        if(gate instanceof OneGate) {
            this.i = gate.i
            this.j = gate.j
        } else if(gate instanceof CNotGate) {
            this.j = gate.j
            if(indexPart == CNotGate.INDEX_CONTROL) {
                this.i = gate.iControl
            } else {
                this.i = gate.iTarget
            }
        }
    }
    setPosition(i: number, j: number): void {
        this.gate.setPosition(i, j, this.indexPart) 
    }
}

export interface Gate {
    getType(): GateType
    findPart(i: number, j: number): GatePart | null
    setPosition(i: number, j: number, indexPart: number): void
    overlap(other: Gate): boolean
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
    overlap(other: Gate): boolean {
        if(other instanceof OneGate) {
            return (this.i === other.i) && (this.j === other.j)
        } else if(other instanceof CNotGate) {
            return ((this.i === other.iControl) && (this.j === other.j)) ||
                ((this.i === other.iTarget)  && (this.j === other.j))
        } else {
            console.log('GateTypeIsInvalid')
            return false
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
        if(indexPart == CNotGate.INDEX_TARGET) {
            this.iTarget = i
            this.j = j
        } else if(indexPart == CNotGate.INDEX_CONTROL) {
            this.iControl = i
            this.j = j
        }
    }
    overlap(other: Gate): boolean {
        return false
    }
}