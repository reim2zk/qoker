import {Qbit, QbitType} from './Qbit'
import {OneGate, CNotGate} from './Gate'

export class Circuit {
    qbits: Qbit[]
    oneGates: OneGate[]
    cNotGates: CNotGate[]
    constructor(numQbit: number) {
        this.qbits = []
        for(let i = 0; i < numQbit; i++) {
            this.qbits.push(new Qbit(QbitType.Q0, i, false))
        }
        this.oneGates = []
        this.cNotGates = []
    }
    static empty(): Circuit {
        return new Circuit(5)
    }
}