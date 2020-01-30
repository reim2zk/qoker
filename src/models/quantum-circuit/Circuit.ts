import {Qubit, QubitType} from './Qubit'
import {Gate, OneGate, CNotGate, GateType, GatePart} from './Gate'
import * as Utils from '../../utils/Utils'

export class Circuit {
    qubits: Qubit[]
    numPosition: number
    gates: Gate[]
    constructor(numQubit: number, numPosition: number) {
        this.qubits = []
        for(let i = 0; i < numQubit; i++) {
            this.qubits.push(new Qubit(QubitType.Q0, i))
        }
        this.numPosition = numPosition
        this.gates = []
    }
    static empty(): Circuit {
        return new Circuit(5, 10)
    }
    validateGate(gate: Gate): boolean {
        let iMin = 0
        let iMax = 0
        if(gate instanceof OneGate) {
            iMin = gate.i
            iMax = gate.i
        } else if(gate instanceof CNotGate) {
            iMin = Math.min(gate.iControl, gate.iTarget)
            iMax = Math.max(gate.iControl, gate.iTarget)
        } else {
            console.log('gate is invalid')
            return false
        }
        return (
            0 <= iMin   && iMax   < this.qubits.length &&
            1 <= gate.j && gate.j < this.numPosition)
    }
    addGate(gateType: GateType): void {
        var gate: Gate = (gateType === GateType.CN) ? 
            new CNotGate(0, 1, 0) : 
            new OneGate(0, 0, gateType)
        this.gates.push(gate)
    }
    clean(): void {
        this.gates.splice(0, this.gates.length)
    }
    overlapGate(gate: Gate): boolean {
        if (gate instanceof OneGate) {
            const finds = this.gates.map(v => 
                v.findPart(gate.i, gate.j) != null)
            return Utils.exists(finds)
        } else if (gate instanceof CNotGate) {
            const findsTarget = this.gates.map(v => 
                v.findPart(gate.iTarget, gate.j) != null)
            const findsControl = this.gates.map(v => 
                v.findPart(gate.iControl, gate.j) != null)
            const finds = findsTarget.concat(findsControl)
            return Utils.exists(finds)
        } else {
            console.log('GateTypeIsInvalid')
            return false
        }
    }
}