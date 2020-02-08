<template>
    <table>
      <tr>
        <th>
          average = {{ Math.round(item.score*100)/100 }}
        </th>
      </tr>
      <tr v-for="(row, i) of item.rows" :key="i+'tr'">
        <td>
          <Cards :items="row.cards" :width="cardWidth" :height="cardHeight"></Cards>
        </td>
        <td> {{ row.count }}% </td>
        <td> {{ row.rank.name }} </td>
        <td> (x{{ row.rank.value }}) </td>
      </tr>
    </table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Cards from "../poker/Cards.vue";
import * as model from "../../models/qoker/Result"
@Component({
    components: {
        Cards
    }
})
export default class Result extends Vue {
    @Prop({default: model.emptyResult()})
    item!: Result

    @Prop({default: 10})
    cardWidth!: number

    @Prop({default: 30})
    cardHeight!: number
}
</script>