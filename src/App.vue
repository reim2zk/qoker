<template>
  <div id="app">
    <Qorker></Qorker>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Qorker from './components/qorker/Qorker.vue'

@Component({
  components: {
    Qorker
  },
})
export default class App extends Vue {}
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
