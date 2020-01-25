<template>
    <span>
        <img v-for="(card, i) of items" :key="i+'card'" 
            class="img" 
            :src="asset(card)"
            :width="cardWidth"/>    
    </span>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/porker/Card'

@Component
export default class Cards extends Vue {
    @Prop({default: 50})
    cardWidth!: number

    @Prop({default: []})
    items!: model.Card[]

    asset(card: model.Card): string {
        const num = ('00' + card.num ).slice( -2 );
        return require(`@/assets/card_${card.mark}_${num}.png`)
    }
}
</script>