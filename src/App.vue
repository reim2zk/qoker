<template>
  <div id="app">
    <div align="left">
      <button @click="startGame"> start </button>
      <button> calculate </button>
      <br/>
      <Porker :item="porker" :cardWidth="cardWidth"></Porker>
      <br/>
      <svg :width="cardWidth*this.porker.cards.length" :height="210">
        <Wires :numWire="5" 
          :x0="cardWidth/2" :dx0="cardWidth" 
          :x1="cardWidth*(this.porker.cards.length/2)" :dx1="10" 
          :y0="0" :dy0="10" :dy1="30" :dy2="130" />
        <Circuit 
          :item="circuit"
          :unitWidth="unitWidth" 
          :y0="55"
          :numPosition="10"/>
        <rect
          :x="cardWidth*this.porker.cards.length-110"
          :y="50"
          :width="100" :height="100" fill="yellow"
          >
        </rect>
        <text :x="cardWidth*this.porker.cards.length-110" :y="100">
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
import Porker from './components/porker/Porker.vue'
import Wires from './components/qorker/Wires.vue'
import * as modelCircuit from './models/quantum-circuit/Circuit'
import * as modelPorker from './models/porker/Porker'
import * as modelGate from './models/quantum-circuit/Gate'

@Component({
  components: {
    Circuit,
    Wires,
    Porker
  },
})
export default class App extends Vue {
  porker: modelPorker.Porker = new modelPorker.Porker()
  circuit: modelCircuit.Circuit = modelCircuit.Circuit.empty()
  cardWidth: number = 100
  unitWidth: number = 30
  measureWidth: number = 15

  resultQbits: number[][] = [
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 1]
  ]

  created() {
    const gs = this.circuit.oneGates
    gs.push(new modelGate.OneGate(0, 0, modelGate.GateType.H))
    gs.push(new modelGate.OneGate(0, 1, modelGate.GateType.X))
    gs.push(new modelGate.OneGate(0, 2, modelGate.GateType.Y))
    gs.push(new modelGate.OneGate(2, 2, modelGate.GateType.Z))
    gs.push(new modelGate.OneGate(0, 3, modelGate.GateType.Z))
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
