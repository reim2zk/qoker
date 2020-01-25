<template>
    <OneGate v-if="oneGate()" 
        :gateType="oneGate().type"
        :x="x(oneGate().j)"
        :y="y(oneGate().i)"
        :diameter="diameter"/>
    <CNotGate 
        v-else-if="cNotGate()" 
        :x="x(cNotGate().j)"
        :yTarget="y(cNotGate().iTarget)"
        :yControl="y(cNotGate().iControl)"
        :diameter="diameter"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/quantum-circuit/Gate'
import OneGate from './OneGate.vue'
import CNotGate from './CNotGate.vue'

@Component({
  components: {
      OneGate,
      CNotGate
  },
})
export default class Gate extends Vue {
    @Prop({default: new model.OneGate(0, 0, model.GateType.H)})
    item!: model.Gate

    @Prop({default: 0})
    diameter!: number

    x(i: number): number {
        return (this.$parent as any).x(i)
    }

    y(i: number): number {
        return (this.$parent as any).y(i)
    }

    oneGate(): model.OneGate | null {
        if(this.item instanceof model.OneGate) {
            return this.item
        } else {
            return null
        }
    }

    cNotGate(): model.CNotGate | null {
        if(this.item instanceof model.CNotGate) {
            return this.item
        } else {
            return null
        }
    }

}
</script>