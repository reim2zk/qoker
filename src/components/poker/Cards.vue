<template>
    <span>
        <img v-for="(card, i) of items" :key="i+'card'" 
            class="img" 
            :src="asset(card)"
            :width="width"
            :height="height ? height : 'auto'"
            style="object-fit:cover; object-position: 0 0;"
            
            />
    </span>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/poker/Card'

@Component
export default class Cards extends Vue {
    @Prop({default: 50})
    width!: number

    @Prop({default: null})
    height!: number | null

    @Prop({default: false})
    isBack!: boolean

    @Prop({default: []})
    items!: model.Card[]

    asset(card: model.Card): string {
        if (this.isBack) {
            return require('@/assets/card_back.png')
        } else {
            const num = ('00' + card.num ).slice( -2 );
            return require(`@/assets/card_${card.mark}_${num}.png`)
        }
    }
}
</script>
<style scoped>
/* img {
  max-width:280;
  max-height:130;
  width: auto;
  height: auto;
} */
</style>