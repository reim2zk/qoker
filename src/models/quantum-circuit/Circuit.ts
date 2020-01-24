import {Qbit, QbitType} from './Qbit'
import {Gate, OneGate, CNotGate, GateType, GatePart} from './Gate'

function exists(xs: boolean[]): boolean {
    return xs.reduceRight((x, y) => x || y, false)
}

export class Circuit {
    qbits: Qbit[]
    numPosition: number
    oneGates: OneGate[]
    cNotGates: CNotGate[]
    gates: Gate[] = []
    constructor(numQbit: number, numPosition: number) {
        this.qbits = []
        for(let i = 0; i < numQbit; i++) {
            this.qbits.push(new Qbit(QbitType.Q0, i, false))
        }
        this.numPosition = numPosition
        this.oneGates = []
        this.cNotGates = []
    }
    static empty(): Circuit {
        return new Circuit(5, 10)
    }
    addGate(gateType: GateType): void {
        var gate: Gate = (gateType === GateType.CN) ? 
            new CNotGate(0, 1, 0) : 
            new OneGate(0, 0, gateType)
        this.gates.push(gate)
    }
    overlapGate(gate: Gate): boolean {
        if (gate instanceof OneGate) {
            const finds = this.gates.map(v => 
                v.findPart(gate.i, gate.j) != null)
            return exists(finds)
        } else if (gate instanceof CNotGate) {
            const findsTarget = this.gates.map(v => 
                v.findPart(gate.iTarget, gate.j) != null)
            const findsControl = this.gates.map(v => 
                v.findPart(gate.iControl, gate.j) != null)
            const finds = findsTarget.concat(findsControl)
            return exists(finds)
        } else {
            console.log('GateTypeIsInvalid')
            return false
        }
    }
}