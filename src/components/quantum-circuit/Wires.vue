<template>
    <svg>
        <line v-for="j of js" :key="j"
          :x1="x0+j*dx0" :y1="y0"
          :x2="x0+j*dx0" :y2="y0+dy0"
          stroke="black"/>
        <line v-for="j of js" :key="j"
          :x1="x0+j*dx0" :y1="y0+dy0"
          :x2="x1+j*dx1" :y2="y0+dy0+dy1"
          stroke="black"/>
        <line v-for="j of js" :key="j"
          :x1="x1+j*dx1" :y1="y0+dy0+dy1"
          :x2="x1+j*dx1" :y2="y0+dy0+dy1+dy2"
          stroke="black"/>
        <line v-for="j of js" :key="j"
          :x1="x1+j*dx1" :y1="y0+dy0+dy1+dy2"
          :x2="x0+j*dx0" :y2="y0+dy0+dy1*2+dy2"
          stroke="black"/>          
        <line v-for="j of js" :key="j"
          :x1="x0+j*dx0" :y1="y0+dy0+dy1*2+dy2"
          :x2="x0+j*dx0" :y2="y0+dy0*2+dy1*2+dy2"
          stroke="black"/>
    </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Wires extends Vue {
    @Prop({default: 0})
    numWire!: number

    @Prop({default: 0})
    x0!: number

    @Prop({default: 10})
    dx0!: number

    @Prop({default: 0})
    x1!: number

    @Prop({default: 10})
    dx1!: number

    @Prop({default: 0})
    y0!: number

    @Prop({default: 0})
    dy0!: number

    @Prop({default: 0})
    dy1!: number

    @Prop({default: 0})
    dy2!: number

    js: number[] = []

    created() {
        const js = []
        for(let i = 0; i < this.numWire; i++) {
            js.push(i)
        }
        this.js.splice(0, this.js.length, ...js)
    }
}
</script>