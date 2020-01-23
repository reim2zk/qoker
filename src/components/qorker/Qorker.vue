<template>
  <div align="left">
    <button @click="start">start</button>
    <button @click="calculate">calculate</button>
    <br />
    <Cards :items="item.cards" :cardWidth="cardWidth"></Cards>
    <br />
    <svg :width="cardWidth*item.cards.length" :height="210">
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
      <Circuit :item="item.circuit" :unitWidth="unitWidth" :y0="55" :numPosition="10" />
      <rect :x="cardWidth*item.cards.length-110" :y="50" :width="100" :height="100" fill="yellow" />
      <text :x="cardWidth*item.cards.length-110" :y="100">
          H = {{ item.score }}
        </text>
    </svg>
    <table>
      <tr v-for="(js, i) of item.results" :key="i+'tr'">
        <td v-for="(j, i) of js" :key="i+'td'" :width="cardWidth-3">
          <center>{{ j }}</center>
        </td>
        <td>11.2</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Circuit from "../quantum-circuit/Circuit.vue";
import Cards from "../porker/Cards.vue";
import Wires from "../qorker/Wires.vue";
import * as model from "../../models/qorker/Qorker";
@Component({
  components: {
    Circuit,
    Wires,
    Cards
  }
})
export default class Qorker extends Vue {
  item: model.Qorker = new model.Qorker()
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
