import * as q from '@qramana/qramana'
import { Circuit } from '../models/quantum-circuit/Circuit'
import { GateType } from '../models/quantum-circuit/Gate'
import { QbitType } from '../models/quantum-circuit/Qbit'

export function simulate(circuit: Circuit): q.Qubit[] {
  const qubits = circuit.qbits.map(v => {
    const value = (v.type == QbitType.Q0) ? "|0>" : "|1>"
    return new q.Qubit({value: value})
  })

  for (let j = 0; j < circuit.numPosition; j++) {
    for (let gate of circuit.oneGates) {
      if (gate.j === j) {
        const qubit = qubits[gate.i]
        if (gate.type == GateType.H) {
          qubit.h()
        } else if (gate.type == GateType.X) {
          qubit.x()
        } else if (gate.type == GateType.Y) {
          qubit.y()
        } else if (gate.type == GateType.Z) {
          qubit.z()
        }
      }
    }

    for (let gate of circuit.cNotGates) {
      if (gate.j === j) {
        const controlQubit = qubits[gate.iControl]
        const targetQubit = qubits[gate.iTarget]
        targetQubit.cnot(controlQubit)
      }
    }
  }

  return qubits
}
