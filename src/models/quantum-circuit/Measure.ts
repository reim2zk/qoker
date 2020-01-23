import * as q from '@qramana/qramana'
import {Circuit} from './Circuit'
import { GateType } from './Gate'

export function measureProbs(circuit: Circuit, num: number) {

  const probs = circuit.qbits.map(v => 0.0)

  for(let m = 0; m < num; m++) {
    

    for(let i in qubits) {
      probs[i] += qubits[i].measure() * 1.0 / num
    }
  }

  return probs
}

function measure(circuit: Circuit): number[] {
  const qubits = circuit.qbits.map(v => new q.Qubit({ value: "|0>" }))
  for(let j = 0; j < circuit.numPosition; j++) {
    for(let gate of circuit.oneGates) {
      if(gate.j === j) {
        const qubit = qubits[gate.i]
        if(gate.type == GateType.H) {
          qubit.h()
        } else if(gate.type == GateType.X) {
          qubit.x()
        } else if(gate.type == GateType.Y) {
          qubit.y()
          } else if(gate.type == GateType.Z) {
            qubit.z()
          }        
        }
      }
  
      for(let gate of circuit.cNotGates) {
        if(gate.j === j) {
          const controlQubit = qubits[gate.iControl]
          const targetQubit = qubits[gate.iTarget]
          targetQubit.cnot(controlQubit)
        }
      }
    }
}