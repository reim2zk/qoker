<template>
    <svg @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
        <line
            v-for="qbit of item.qbits"
            :key="qbit.index + 'line'"
            :x1="x(0)" 
            :y1="y(qbit.index)" 
            :x2="x(numPosition)" 
            :y2="y(qbit.index)" 
            stroke="black">
        </line>
        <OneGate
            v-for="(gate, i) of item.oneGates"
            :key="i + 'one'"
            :gateType="gate.type"
            :x="x(gate.j)"
            :y="y(gate.i)"
            :diameter="unitHeight-2">
        </OneGate>
        <CNotGate
            v-for="(gate, i) of item.cNotGates"
            :key="i + 'cnot'"
            :x="x(gate.j)"
            :yTarget="y(gate.iTarget)"
            :yControl="y(gate.iControl)"
            :diameter="unitHeight-2"
        >
        </CNotGate>
        <svg v-for="wire in wires" :key="wire.j">
            <line
                :x1="x(wire.j)"
                :y1="y(wire.i1)"
                :x2="x(wire.j)"
                :y2="y(wire.i2)"
                stroke="black">
            </line>
            <circle
                v-for="i in wire.iDots" :key="i"
                :cx="x(wire.j)"
                :cy="y(i)"
                r="3"
                fill="black">
            </circle>
        </svg>
        
    </svg>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as modelGate from './Gate'
import * as qbitModel from './Qbit'
import * as wireModel from './Wire'
import * as circuitView from './CircuitView'
import * as model from './Circuit'
import OneGate from './OneGate.vue'
import CNotGate from './CNotGate.vue'

@Component({
  components: {
      OneGate,
      CNotGate
  },
})
export default class Circuit extends Vue {

    @Prop({default: model.Circuit.empty() })
    item!: model.Circuit

    selectedPart: modelGate.GatePart | null = null

    @Prop({default: 0})
    x0!: number

    @Prop({default: 0})
    y0!: number

    @Prop({default: 20})
    unitWidth!: number

    @Prop({default: 20})
    unitHeight!: number

    @Prop({default: 15})
    qbitWidth!: number

    @Prop({default: 15})
    measureWidth!: number

    @Prop({default: 5})
    numQbit!: number

    @Prop({default: 8})
    numPosition!: number

    @Prop({default: []})
    wires!: wireModel.Wire[]

    width(): number { 
        return this.qbitWidth + this.numPosition * this.unitWidth + this.measureWidth
    }
    height(): number { 
        return (this.numQbit+1) * this.unitHeight 
    }
    getJ(x: number): number { 
        return Math.floor((x - this.x0 - this.qbitWidth) / this.unitWidth)
    }
    getI(y: number): number { 
        return Math.floor((y - this.y0) / this.unitHeight) 
    }
    x(j: number): number { 
        return this.x0 + this.qbitWidth + (j + 0.5) * this.unitWidth 
    }
    y(i: number): number { 
        return this.y0 + (i + 0.5) * this.unitHeight 
    }    

    mousedown(e: MouseEvent): void {
        if(this.selectedPart) {
            return
        }

        const i = this.getI(e.offsetY)
        const j = this.getJ(e.offsetX)

        for(let gate of this.item.oneGates) {
            const p = gate.findPart(i, j)
            if(p) {
                this.selectedPart = p
                return
            }
        }
        for(let gate of this.item.cNotGates) {
            const p = gate.findPart(i, j)
            if(p) {
                this.selectedPart = p
                return
            }
        }
    }

    mousemove(e: MouseEvent): void {
        if(!this.selectedPart) {
            return
        }

        const i = this.getI(e.offsetY)
        const j = this.getJ(e.offsetX)
        this.selectedPart.setPosition(i, j)
    }

    mouseup(e: MouseEvent): void {
        if(!this.selectedPart) {
            return
        }
        this.selectedPart = null
    }

    created() {
        // const qbits: qbitModel.Qbit[] = []
        // for(let i = 0; i < this.numQbit; i++) {
        //     const q = new qbitModel.Qbit(qbitModel.QbitType.Q0, i, true)
        //     qbits.push(q)
        // }
        // this.circuit.qbits.splice(0, this.numQbit, ...qbits)

        // const oneGates = [
        //     new modelGate.OneGate(2, 2, modelGate.GateType.X),
        //     new modelGate.OneGate(2, 5, modelGate.GateType.H)
        // ]
        // this.oneGates.splice(0, this.oneGates.length, ...oneGates)

        // const cNotGates =  [
        //     new model.CNotGate(3, 4, 3)
        // ]
        // this.cNotGates.splice(0, this.cNotGates.length, ...cNotGates)
    }
}
</script>

