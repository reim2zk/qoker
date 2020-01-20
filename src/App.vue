<template>
  <div id="app">
    <Circuit :one-gates="oneGates()" :c-not-gates="cNotGates()"></Circuit>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Circuit from './components/quantum-circuit/Circuit.vue'
import * as model from './components/quantum-circuit/Gate'

@Component({
  components: {
    Circuit
  },
})
export default class App extends Vue {
  oneGates(): model.OneGate[] {
    return [
      new model.OneGate(2, 2, model.GateType.X),
      new model.OneGate(2, 5, model.GateType.H)
    ]
  }
  cNotGates(): model.CNotGate[] {
    return [
      new model.CNotGate(3, 4, 3)
    ]
  }
  getType(): model.GateType {
    return model.GateType.X
  }
  oneGate(): model.OneGate {
    return new model.OneGate(2, 2, model.GateType.X)
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
