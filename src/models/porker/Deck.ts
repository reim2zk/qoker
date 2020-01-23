import {Card, CardMark} from './Card'

export class Deck {
    cards: Card[]
    constructor() {
        this.cards = []
        this.initDeck()
    }
    initDeck(): void {
        this.cards = []
        for(let i = 1; i <= 12; i++) {
            this.cards.push(new Card(i, CardMark.Spade))
        }
    }
    shuffle() {
        Deck.shuffleArray(this.cards)        
    }
    drawCards(num: number): Card[] | null{
        if(num < 1) {
            return null
        }
        if(num > this.cards.length) {
            return null
        }
        const cards = this.cards.slice(0, num)
        return cards
    }
    static shuffleArray<T>(xs: T[]) {
        for(let i = xs.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = xs[i];
            xs[i] = xs[r];
            xs[r] = tmp;
        }
    }    
}