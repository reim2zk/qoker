<template>
    <span>
        <button @click="shuffle">SHUFFLE</button>
        <br/>
        <img v-for="(card, i) of cards" :key="i+'card'" 
            class="img" 
            :src="asset(card)"
            :width="cardWidth"/>    
    </span>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as model from './Card'

@Component
export default class VideoPorker extends Vue {
    @Prop({default: 50})
    cardWidth!: number

    cards: model.Card[] = [
        new model.Card(1, model.CardMark.Spade),
        new model.Card(2, model.CardMark.Spade),
        new model.Card(3, model.CardMark.Spade),
        new model.Card(4, model.CardMark.Spade),
        new model.Card(5, model.CardMark.Spade)
    ]
    deck: model.Card[] = []

    asset(card: model.Card): string {
        return require(`@/assets/card_${card.mark}_${card.num}.png`)
    }
    shuffle(e: any) {
        this.shuffleArray(this.deck)        
        this.cards.splice(0, this.cards.length, ...this.deck.slice(0, 5))
    }
    created() {
        const deck: model.Card[] = model.Card.deck()
        this.deck.splice(0, this.deck.length, ...deck)
    }

    shuffleArray<T>(xs: T[]) {
        for(let i = xs.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = xs[i];
            xs[i] = xs[r];
            xs[r] = tmp;
        }
    }
}
</script>