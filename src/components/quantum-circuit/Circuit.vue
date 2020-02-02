<template>
    <svg @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
        <rect
            :x=x(-1)
            :y=y(-1)
            :width="unitWidth"
            :height="height()"
            fill="white">
        </rect>
        <rect
            :x=x(0)
            :y=y(-1)
            :width="x(item.numPosition+1)-x(0)"
            :height="height()"
            fill="white">
        </rect>
        <rect
            :x="x(item.numPosition+1)"
            :y="y(-1)"
            :width="unitWidth*(inactiveNumPosition-1)"
            :height="height()"
            fill="white">
        </rect>
        <rect
            :x=x(0)+2
            :y=y(this.numQubit)+2
            :width="unitWidth*6-2"
            :height="unitHeight*2+2"
            fill="white"/>
        <text
            v-for="qubit of item.qubits"
            :key="qubit.index+'qubit'"
            :x="x(-1)" 
            :y="y(qubit.index)"
            dominant-baseline="central"
            style="user-select: none">
            {{ qubit.toString() }}
        </text>
        <line
            v-for="qubit of item.qubits"
            :key="qubit.index + 'line'"
            :x1="x(0)" 
            :y1="y(qubit.index)" 
            :x2="x(item.numPosition+inactiveNumPosition)" 
            :y2="y(qubit.index)" 
            stroke="black">
        </line>
        <Gate 
            v-for="(gate, i) of item.gates"
            :key="i+'gate'"
            :item="gate" 
            :diameter="unitHeight-2"
        />
        <Gate v-if="selectedPart" :item="selectedPart.gate" :diameter="unitHeight-2"/>
       <Gate 
            v-for="(gate, i) of buttonGates"
            :key="i+'gateb'"
            :item="gate" 
            :diameter="unitHeight-2"
        />
        <text
            :x="x(-1)-3" 
            :y="y(this.numQubit+1)+3">
            Gates
        </text>
    </svg>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/quantum-circuit/Circuit'
import * as modelGate from '../../models/quantum-circuit/Gate'
import OneGate from './OneGate.vue'
import CNotGate from './CNotGate.vue'
import Gate from './Gate.vue'

@Component({
  components: {
      OneGate,
      CNotGate,
      Gate
  },
})
export default class Circuit extends Vue {

    @Prop({default: model.Circuit.empty() })
    item!: model.Circuit

    selectedPart: modelGate.GatePart | null = null

    buttonGates: modelGate.Gate[] = []

    @Prop({default: 0})
    x0!: number

    @Prop({default: 0})
    y0!: number

    @Prop({default: 20})
    unitWidth!: number

    @Prop({default: 20})
    unitHeight!: number

    @Prop({default: 15})
    qubitWidth!: number

    @Prop({default: 15})
    measureWidth!: number

    @Prop({default: 5})
    numQubit!: number

    @Prop({default: 4})
    inactiveNumPosition!: number

    width(): number { 
        return this.qubitWidth + this.item.numPosition * this.unitWidth + this.measureWidth
    }
    fullWidth(): number {
        return this.qubitWidth + (this.item.numPosition + this.inactiveNumPosition) * this.unitWidth + this.measureWidth        
    }
    height(): number { 
        return (this.numQubit+1) * this.unitHeight 
    }
    getJ(x: number): number { 
        return Math.floor((x - this.x0 - this.qubitWidth) / this.unitWidth)
    }
    getI(y: number): number { 
        return Math.floor((y - this.y0) / this.unitHeight) 
    }
    x(j: number): number { 
        return this.x0 + this.qubitWidth + (j + 0.5) * this.unitWidth 
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

            this.item.gates.forEach((v, idx) => {
                const p = v.findPart(i, j)
                if(p) {
                    this.item.gates.splice(idx, 1)
                    this.selectedPart = p
                    return
                }
            })

            this.buttonGates.forEach((v, idx) => {
                const p = v.findPart(i, j)
                if(p) {
                    p.gate = p.gate.clone()
                    this.selectedPart = p
                    return
                }
            })
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
            const g = this.selectedPart.gate
            if(this.item.validateGate(g)) {
                this.item.gates.push(g)
            }
            this.selectedPart = null
        } 
    }

    created() {
        const i = this.numQubit + 1
        const bs = [
            new modelGate.OneGate(i, 1, modelGate.GateType.H),
            new modelGate.OneGate(i, 2, modelGate.GateType.X),
            new modelGate.OneGate(i, 3, modelGate.GateType.Y),
            new modelGate.OneGate(i, 4, modelGate.GateType.Z),
            new modelGate.CNotGate(i+1, i, 5)
        ]
        this.buttonGates.splice(0, 0, ...bs)
    }
}
</script>

