<template>
    <svg>        
        <line
            v-for="qbit of qbits"
            :key="qbit.index + 'line'"
            :x1="x(0)" 
            :y1="y(qbit.index)" 
            :x2="x(numQbit)" 
            :y2="y(qbit.index)" 
            stroke="black">
        </line>
        <OneGate
            v-for="(gate, i) of oneGates"
            :key="i + 'one'"
            :x="x(gate.j)"
            :y="y(gate.i)"
            :diameter="unitHeight-2">
        </OneGate>
        <CNotGate
            v-for="(gate, i) of cNotGates"
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
import * as model from './Gate'
import * as qbitModel from './Qbit'
import * as circuitView from './CircuitView'
import OneGate from './OneGate.vue'
import CNotGate from './CNotGate.vue'

@Component({
  components: {
      OneGate,
      CNotGate
  },
})
export default class Circuit extends Vue {
    qbits: qbitModel.Qbit[] = []

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

    @Prop({default: 10})
    numPosition!: number

    @Prop({default: []})
    oneGates!: model.OneGate[]

    @Prop({default: []})
    cNotGates!: model.CNotGate[]

    width(): number { 
        return this.qbitWidth + this.numPosition * this.unitWidth + this.measureWidth
    }
    height(): number { 
        return (this.numQbit+1) * this.unitHeight 
    }
    // position(x: number): number | PositionType.InitQbit | PositionType.Measure { 
    //     if(x < this.qbitWidth) {
    //         return PositionType.InitQbit
    //     } else if (x > this.qbitWidth + this.unitWidth * 10) {
    //         return PositionType.Measure
    //     } else {
    //         return Math.floor((x - this.qbitWidth) / this.unitWidth) 
    //     }
    // }
    // indexQbit(y: number): number { 
    //     return Math.floor(y / this.unitHeight) 
    // }
    x(j: number): number { 
        return (j + 0.5) * this.unitWidth + this.qbitWidth
    }
    y(i: number): number { 
        return (i + 0.5) * this.unitHeight 
    }    

    created() {
        const qbits: qbitModel.Qbit[] = []
        for(let i = 0; i < this.numQbit; i++) {
            const q = new qbitModel.Qbit(qbitModel.QbitType.Q0, i, true)
            qbits.push(q)
        }
        this.qbits.splice(0, this.numQbit, ...qbits)
    }
}
</script>

