<template>
    <svg>
        <rect
            :x="x - diameter / 2"
            :y="y - diameter / 2"
            :width="diameter"
            :height="diameter"
            :fill="fill()">
        </rect>
        <text
            :x="x"
            :y="y"
            :font-size="diameter" 
            text-anchor="middle"
            dominant-baseline="central"
            style="user-select: none">
            {{ text() }}
        </text>
    </svg>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from './Gate'
import * as circuitView from './CircuitView'

@Component
export default class OneGate extends Vue {
    @Prop({default: model.GateType.H})
    gateType!: model.GateType
    
    @Prop({default: 0})
    x!: number

    @Prop({default: 0})
    y!: number

    @Prop({default: 30})
    diameter!: number
    
    fill(): string {
        switch(this.gateType) {
            case model.GateType.H:
                return 'yellow'
            case model.GateType.X:
                return 'cyan'
            case model.GateType.Y:
                return 'cyan'
            case model.GateType.Z:
                return 'cyan'
            default:
                return 'black'
        }
    }
    text(): string {
        switch(this.gateType) {
            case model.GateType.H:
                return 'H'
            case model.GateType.X:
                return 'X'
            case model.GateType.Y:
                return 'Y'
            case model.GateType.Z:
                return 'Z'
            default:
                return 'None'
        }
    }
    created() {
    } 
}
</script>

