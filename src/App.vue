<template>
  <div id="app">
    <img v-for="(card, i) of cards" :key=i class="img" :src="card" width="100"/>
    <br/>
    <Circuit :wires="wires()"></Circuit>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Circuit from './components/quantum-circuit/Circuit.vue'
import * as model from './components/quantum-circuit/Gate'
import * as wireModel from './components/quantum-circuit/Wire'

@Component({
  components: {
    Circuit
  },
})
export default class App extends Vue {
  wires(): wireModel.Wire[] {
    return [
      new wireModel.Wire(-2, 6, 6, [2, 3]),
      new wireModel.Wire(-2, 6, 7, [2])
    ]
  }
  cards = [
    require('@/assets/card_spade_1.png'),
    require('@/assets/card_spade_2.png'),
    require('@/assets/card_spade_3.png'),
    require('@/assets/card_spade_4.png'),
    require('@/assets/card_spade_5.png'),
  ]
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
