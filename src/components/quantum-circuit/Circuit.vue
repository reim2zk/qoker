<template>
    <svg @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
        <rect
            :x=x(-1)
            :y=y(-1)
            :width="width()"
            :height="height()"
            fill="cyan">
        </rect>
        <!--
        <text
            v-for="qubit of item.qbits"
            :key="qubit.index+'qubit'"
            :x="x(-1)" 
            :y="y(qubit.index)">
            {{ qubit.toString() }}
        </text>
        -->
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
            v-for="(gate, i) of oneGates()"
            :key="i + 'one'"
            :gateType="gate.type"
            :x="x(gate.j)"
            :y="y(gate.i)"
            :diameter="unitHeight-2">
        </OneGate>
        <CNotGate
            v-for="(gate, i) of cNotGates()"
            :key="i + 'cnot'"
            :x="x(gate.j)"
            :yTarget="y(gate.iTarget)"
            :yControl="y(gate.iControl)"
            :diameter="unitHeight-2"
        >
        </CNotGate>
    </svg>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/quantum-circuit/Circuit'
import * as modelGate from '../../models/quantum-circuit/Gate'
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

    oneGates(): modelGate.OneGate[] {
        function filter(gate: modelGate.Gate): modelGate.OneGate[] {
            if(gate instanceof modelGate.OneGate)
                return [gate]
            else 
                return []
        }
        return this.item.gates.flatMap(v => filter(v))
    }

    cNotGates(): modelGate.CNotGate[] {
        function filter(gate: modelGate.Gate): modelGate.CNotGate[] {
            if(gate instanceof modelGate.CNotGate)
                return [gate]
            else 
                return []
        }
        return this.item.gates.flatMap(v => filter(v))
    }

    mousedown(e: MouseEvent): void {
        if(this.selectedPart) {
            return
        } else {
            const i = this.getI(e.offsetY)
            const j = this.getJ(e.offsetX)

            for(let gate of this.item.gates) {
                const p = gate.findPart(i, j)
                if(p) {
                    this.selectedPart = p
                    return
                }
            }
        }
    }

    mousemove(e: MouseEvent): void {
        if(this.selectedPart) {
            const i = this.getI(e.offsetY)
            const j = this.getJ(e.offsetX)
            this.selectedPart.setPosition(i, j)           
        } 
    }

    mouseup(e: MouseEvent): void {
        if(this.selectedPart) {
            this.selectedPart = null
        } 
    }
}
</script>

