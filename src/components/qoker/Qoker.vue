<template>
  <div align="center">
    <h1>Quantum Poker</h1>
    <button v-if="showStart()" @click="start">start</button>
    <button v-if="showCalculate()" @click="calculate">calculate</button>
    <button v-if="showContinue()" @click="continueGame">next</button>
    <span> SCORE = {{ item.score }} </span>
    <br />
    <Cards :items="item.cards" :width="cardWidth" :isBack="isBack()"></Cards>
    <!-- <span style="font-size: 25px"> |0> </span> -->
    <br />
    <!--
    <Cards :items="item.subCards" :width="cardWidth"></Cards>
    <span style="font-size: 25px"> |1> </span>
    <br />
    -->
    <svg :width="cardWidth*item.cards.length" :height="item.unitHeight*8">
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
      /> -->
      <Circuit :item="item.circuit" :unitWidth="unitWidth" :y0="5" :numPosition="10" />
    </svg>
    <table>
      <tr v-for="(row, i) of item.resultRows" :key="i+'tr'">
        <td>
          <Cards :items="row.cards" :width="cardWidth" :height="30"></Cards>
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
enum Status {
  Zero,
  ChoseHand,
  Result
}
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
  status: Status = Status.Zero

  showStart(): Boolean {
    return this.status === Status.Zero
  }

  showCalculate(): Boolean {
    return this.status === Status.ChoseHand
  }
  
  showContinue(): Boolean {
    return this.status === Status.Result
  }

  isBack(): Boolean {
    return this.status === Status.Zero
  }

  created() {
  }

  start(e: any) {
    this.status = Status.ChoseHand
    this.item.start()
  }

  calculate(e: any) {
    this.status = Status.Result
    this.item.calculate()
  }

  continueGame(e: any) {
    this.status = Status.ChoseHand
    this.item.start()
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
