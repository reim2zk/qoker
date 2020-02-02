<template>
    <svg>
        <line 
            :x1="x" 
            :x2="x" 
            :y1="yControl"
            :y2="yTarget"
            stroke="red"/>
        <circle
            :cx="x"
            :cy="yControl"
            :r="controlRadius()"
            fill="red">
        </circle>
        <circle
            :cx="x"
            :cy="yTarget"
            :r="targetRadius()"
            stroke="red"
            fill="red">
        </circle>
        <text 
            :x="x" 
            :y="yTarget-1" 
            :font-size="diameter" 
            text-anchor="middle" 
            dominant-baseline="central"
            style="user-select: none">
            +
        </text>
    </svg>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/quantum-circuit/Gate'

@Component
export default class CNotGate extends Vue {
    @Prop({default: 0})
    x!: number

    @Prop({default: 60})
    yControl!: number

    @Prop({default: 0})
    yTarget!: number

    @Prop({default: 10})
    diameter!: number

    controlRadius(): number {
        return this.diameter / (2 * 3)
    }

    targetRadius(): number {
        return this.diameter / 2
    }
}
</script>

