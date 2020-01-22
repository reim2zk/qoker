<template>
  <div id="app">
    <div align="left">
      <button @click="startGame"> start </button>
      <button> calculate </button>
      <br/>
      <VideoPorker :item="porker" :cardWidth="cardWidth"></VideoPorker>
      <br/>
      <svg :width="cardWidth*cards.length" :height="210">
        <Wires :numWire="5" 
          :x0="cardWidth/2" :dx0="cardWidth" 
          :x1="cardWidth*(cards.length/2)" :dx1="10" 
          :y0="0" :dy0="10" :dy1="30" :dy2="130" />
        <Circuit 
          :item="circuit"
          :unitWidth="unitWidth" 
          :wires="wires()" 
          :y0="55"
          :numPosition="10"/>
        <rect
          :x="cardWidth*cards.length-110"
          :y="50"
          :width="100" :height="100" fill="yellow"
          >
        </rect>
        <text :x="cardWidth*cards.length-110" :y="100">
          H = 120 point
        </text>
      </svg>
      <table>
        <tr v-for="(js, i) of resultQbits" :key="i+'tr'">
          <td v-for="(j, i) of js" :key="i+'td'" :width="cardWidth-3">
            <center>
              {{ j }}
            </center>
          </td>
          <td>
            11.2%
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Circuit from './components/quantum-circuit/Circuit.vue'
import Wires from './components/quantum-circuit/Wires.vue'
import VideoPorker from './components/porker/VideoPorker.vue'
import * as model from './components/quantum-circuit/Gate'
import * as wireModel from './components/quantum-circuit/Wire'
import * as qbitModel from './components/quantum-circuit/Qbit'
import * as circuitModel from './components/quantum-circuit/Circuit'
import * as gateModel from './components/quantum-circuit/Gate'
import * as porkerModel from './components/porker/Porker'

@Component({
  components: {
    Circuit,
    Wires,
    VideoPorker
  },
})
export default class App extends Vue {
  wires(): wireModel.Wire[] {
    // return [
    //   new wireModel.Wire(-2, 6, 6, [2, 3]),
    //   new wireModel.Wire(-2, 6, 7, [2])
    // ]
    return []
  }
  cards: string[] = [
    require('@/assets/card_spade_1.png'),
    require('@/assets/card_spade_2.png'),
    require('@/assets/card_spade_3.png'),
    require('@/assets/card_spade_4.png'),
    require('@/assets/card_spade_5.png'),
  ]

  porker: porkerModel.Porker = porkerModel.Porker.init()
  circuit: circuitModel.Circuit = circuitModel.Circuit.empty()
  cardWidth: number = 100
  unitWidth: number = 30
  measureWidth: number = 15

  resultQbits: number[][] = [
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 1]
  ]

  created() {
    const gs = this.circuit.oneGates
    gs.push(new gateModel.OneGate(0, 0, gateModel.GateType.H))
    gs.push(new gateModel.OneGate(0, 1, gateModel.GateType.X))
    gs.push(new gateModel.OneGate(0, 2, gateModel.GateType.Y))
    gs.push(new gateModel.OneGate(2, 2, gateModel.GateType.Z))
    gs.push(new gateModel.OneGate(0, 3, gateModel.GateType.Z))
    console.log(gs)
  }

  startGame(e: any) {
    this.porker.cards[0].num = 12
    console.log('start game')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
