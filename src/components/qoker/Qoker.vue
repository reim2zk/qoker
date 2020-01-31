<template>
  <div align="center">
    <h1>Quantum Poker</h1>
    <button v-if="item.isWelcome()" @click="start">start</button>
    <button v-else-if="item.isChoosing()" @click="calculate">calculate</button>
    <button v-else-if="item.isResult()" @click="continueGame">next</button>
    <span> SCORE = {{ item.score }}  Remaining = {{ item.remainingCount }} </span>
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
    <Result :item="item.result" :cardWidth="cardWidth" :cardHeight="cardHeight">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Circuit from "../quantum-circuit/Circuit.vue";
import Cards from "../poker/Cards.vue";
import Wires from "./Wires.vue";
import Result from "./Result.vue";
import * as model from "../../models/qoker/Qoker";
import * as gateModel from "../../models/quantum-circuit/Gate";
@Component({
  components: {
    Circuit,
    Wires,
    Cards,
    Result
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

  continueGame(e: any) {
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
