<template>
  <div id="app">
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
