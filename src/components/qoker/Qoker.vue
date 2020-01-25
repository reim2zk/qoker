<template>
  <div align="left">
    <button @click="start">start</button>
    <button @click="calculate">calculate</button>
    <br />
    <Cards :items="item.cards" :width="cardWidth"></Cards>
    <span style="font-size: 25px"> |0> </span>
    <br />
    <Cards :items="item.subCards" :width="cardWidth"></Cards>
    <span style="font-size: 25px"> |1> </span>
    <br />
    <svg :width="cardWidth*item.cards.length" :height="unitHeight*8">
      <!--<Wires
        :numWire="5"
        :x0="cardWidth/2"
        :dx0="cardWidth"
        :x1="cardWidth*(item.cards.length/2)"
        :dx1="10"
        :y0="0"
        :dy0="10"
        :dy1="30"
        :dy2="130"
      />-->
      <Circuit :item="item.circuit" :unitWidth="unitWidth" :y0="5" :numPosition="10" />
      <rect :x="unitWidth*item.circuit.numPosition + 50" :y="5" :width="100" :height="100" fill="yellow" />
      <text :x="unitWidth*item.circuit.numPosition + 50" :y="55"
        style="user-select: none">
          score = x{{ item.score }}
        </text>
    </svg>
    <table>
      <tr v-for="(row, i) of item.resultRows" :key="i+'tr'">
        <td>
          <Cards :items="row.cards" :width="cardWidth" :height="cardWidth/3"></Cards>
        </td>
        <td> {{ row.measures }} </td>
        <td> {{ row.count }} </td>
        <td> {{ row.rank.name }} </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Circuit from "../quantum-circuit/Circuit.vue";
import Cards from "../poker/Cards.vue";
import Wires from "../qoker/Wires.vue";
import * as model from "../../models/qoker/Qoker";
import * as gateModel from "../../models/quantum-circuit/Gate";
@Component({
  components: {
    Circuit,
    Wires,
    Cards
  }
})
export default class Qoker extends Vue {
  item: model.Qoker = new model.Qoker()
  cardWidth: number = 100;
  unitWidth: number = 30;
  measureWidth: number = 15;

  created() {
  }

  start(e: any) {
    this.item.start()
  }

  calculate(e: any) {
    this.item.calculate()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
