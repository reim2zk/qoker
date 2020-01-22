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
import * as model from './Card'
import * as modelPorker from './Porker'

@Component
export default class VideoPorker extends Vue {
    @Prop({default: 50})
    cardWidth!: number

    @Prop({default: modelPorker.Porker.init})
    item!: modelPorker.Porker

    asset(card: model.Card): string {
        return require(`@/assets/card_${card.mark}_${card.num}.png`)
    }

    shuffle(e: any): void {
        this.item.shuffle()
    }

    created() {}
}
</script>