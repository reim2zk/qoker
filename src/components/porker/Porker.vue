<template>
    <span>
        <button @click="shuffle">SHUFFLE</button>
        <br/>
        <img v-for="(card, i) of item.cards" :key="i+'card'" 
            class="img" 
            :src="asset(card)"
            :width="cardWidth"/>    
    </span>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from '../../models/porker/Porker'
import * as modelCard from '../../models/porker/Card'

@Component
export default class Porker extends Vue {
    @Prop({default: 50})
    cardWidth!: number

    @Prop({default: model.Porker.init})
    item!: model.Porker

    asset(card: modelCard.Card): string {
        return require(`@/assets/card_${card.mark}_${card.num}.png`)
    }

    shuffle(e: any): void {
        this.item.shuffle()
    }

    created() {}
}
</script>