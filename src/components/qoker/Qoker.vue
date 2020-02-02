<template>
  <div align="center">
    <h1>Quantum Poker</h1>
    <span v-if="item.isWelcome()"> Welcome! </span>
    <span v-else-if="item.isChoosing()"> set quantum gates </span>
    <span v-else-if="item.isResult()">  </span>
    <span v-else-if="item.isCongrats()"> Congraturations! </span>
    <span v-else-if="item.isGameOver()"> GameOver! </span>
    <br/>
    <button v-if="item.isWelcome()" @click="start">start</button>
    <button v-else-if="item.isChoosing()" @click="calculate">calculate</button>
    <button v-else-if="item.isResult()" @click="continueGame">continue</button>
    <button v-else-if="item.isGameOver()" @click="finish">finish</button>
    <button v-else-if="item.isCongrats()" @click="finish">finish</button>
    <span>Point = {{ Math.round(item.point*100)/100 }} Remaining = {{ item.remainingCount }}</span>
    <br />
    <Cards :items="item.cards" :width="cardWidth" :isBack="item.isWelcome()"></Cards>
    <br />
    <svg v-if="!item.isWelcome()" :width="cardWidth*item.cards.length" :height="220">
      <Circuit :item="item.circuit" :unitWidth="unitWidth" :unitHeight="unitHeight" :y0="50" />
      <svg v-for="ix of ixVerticalLines" :key="ix.i+'__'+ix.x">
        <line :x1="(ix.i+0.5)*cardWidth" :y1="0" :x2="ix.x" :y2="50-unitHeight/2" stroke="black"/>
        <line :x1="ix.x" :y1="50-unitHeight/2"   :x2="ix.x" :y2="50-unitHeight/2+(ix.i+1)*unitHeight" stroke="black"/>
        <circle :cx="ix.x" :cy="50-unitHeight/2+(ix.i+1)*unitHeight" :r="2" fill="black"/>
      </svg>
    </svg>
    <table v-if="item.isChoosing()">
      <tr>
        <th>Ranking</th>
        <th>Score</th>
      </tr>
      <tr>
        <td>Royal straight flush</td>
        <td>x12</td>
      </tr>
      <tr>
        <td>straight flush</td>
        <td>x4</td>
      </tr>
      <tr>
        <td>straight</td>
        <td>x4</td>
      </tr>
      <tr>
        <td>flush</td>
        <td>x4</td>
      </tr>
      <tr>
        <td>full house</td>
        <td>x4</td>
      </tr>
      <tr>
        <td>four cards</td>
        <td>x4</td>
      </tr>
      <tr>
        <td>three cards</td>
        <td>x2</td>
      </tr>
      <tr>
        <td>two pair</td>
        <td>x2</td>
      </tr>
      <tr>
        <td>one pair</td>
        <td>x1</td>
      </tr>
      <tr>
        <td>nothing</td>
        <td>x0</td>
      </tr>
    </table>
    <Result
      v-else-if="showResult()"
      :item="item.result"
      :cardWidth="cardWidth"
      :cardHeight="cardWidth/3.5"
    />
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
  cardWidth: number = 100
  unitWidth: number = 25
  unitHeight: number = 20
  measureWidth: number = 15;
  ixVerticalLines: {i: number, x: number}[] = []

  created() {
    const dx = 10
    const x0 = (this.item.circuit.numPosition + 3) * this.unitWidth
    for(let i = 0; i < 5; i++) {
      this.ixVerticalLines.push({i: i, x: x0+i*dx})
    }
  }

  start(e: any) {
    this.item.start();
  }

  calculate(e: any) {
    this.item.calculate();
  }

  continueGame(e: any) {
    this.item.start();
  }

  showResult(): boolean {
    return (
      this.item.status === model.Status.Result ||
      this.item.status === model.Status.Congurats ||
      this.item.status === model.Status.GameOver)
  }

  fnish(e: any) {
    console.log('finish')
    this.item.finish()
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
