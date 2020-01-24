import {Qbit, QbitType} from './Qbit'
import {Gate} from './Gate'

export class Circuit {
    qbits: Qbit[]
    numPosition: number
    gates: Gate[]
    constructor(numQbit: number, numPosition: number) {
        this.qbits = []
        for(let i = 0; i < numQbit; i++) {
            this.qbits.push(new Qbit(QbitType.Q0, i, false))
        }
        this.numPosition = numPosition
        this.gates = []
    }
    static empty(): Circuit {
        return new Circuit(5, 10)
    }
}