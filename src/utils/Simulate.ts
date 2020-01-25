import * as q from '@qramana/qramana'
import { Circuit } from '../models/quantum-circuit/Circuit'
import { Gate, OneGate, CNotGate, GateType } from '../models/quantum-circuit/Gate'
import { QubitType } from '../models/quantum-circuit/Qubit'
import * as Utils from '../utils/Utils'

export function simulate(circuit: Circuit): q.Qubit[] {
  const qubits = circuit.qubits.map(v => {
    const value = (v.type == QubitType.Q0) ? "|0>" : "|1>"
    return new q.Qubit({ value: value })
  })
    
  const groupedGates = Utils.groupBy<number, Gate>(circuit.gates, getJ)
  for (let kv of groupedGates) {
    const gates = kv[1]
    gates.forEach(gate => applyGate(gate, qubits))
  }
  return qubits
}

function getJ(gate: Gate): number {
  if (gate instanceof OneGate) {
    return gate.j
  } else if (gate instanceof CNotGate) {
    return gate.j
  } else {
    return -1
  }
}

function applyGate(gate: Gate, qubits: q.Qubit[]) {
  if (gate instanceof OneGate) {
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
  } else if (gate instanceof CNotGate) {
    const controlQubit = qubits[gate.iControl]
    const targetQubit = qubits[gate.iTarget]
    targetQubit.cnot(controlQubit)
  }
}