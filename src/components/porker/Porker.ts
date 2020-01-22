import {Card, CardMark} from './Card'

export class Porker {
    cards: Card[]
    deck: Card[]
    constructor() {
        this.cards = [
            new Card(1, CardMark.Spade),
            new Card(2, CardMark.Spade),
            new Card(3, CardMark.Spade),
            new Card(4, CardMark.Spade),
            new Card(5, CardMark.Spade)
        ]
        this.deck = []
        for(let i = 1; i <= 12; i++) {
            this.deck.push(new Card(i, CardMark.Spade))
        }
    }
    static init(): Porker { return new Porker() }
    shuffle() {
        this.shuffleArray(this.deck)        
        this.cards.splice(0, this.cards.length, ...this.deck.slice(0, 5))
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
