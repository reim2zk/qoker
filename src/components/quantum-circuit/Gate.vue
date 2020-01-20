<template>
    <p> {{x}} </p>
</template>
<script lang="ts">
import {Vue} from 'vue-property-decorator'
import * as model from './Gate'
import * as circuitView from './CircuitView'
export default class Gate extends Vue {    
    // gate: model.Gate
    // circuitView: circuitView.CircuitView
    x: number = 1
    funcx(): string { return 'x' }
}
</script>

