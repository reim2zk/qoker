import {Card, CardMark} from './Card'
import * as Utils from '../../utils/Utils'

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
            this.cards.push(new Card(i, CardMark.Club))
            this.cards.push(new Card(i, CardMark.Heart))
            this.cards.push(new Card(i, CardMark.Diamond))
        }
    }
    shuffle() {
        Utils.shuffleArray(this.cards)        
    }
    drawCards(num: number, deleteDrawed: boolean): Card[] | null{
        if(num < 1) {
            return null
        }
        if(num > this.cards.length) {
            return null
        }
        const cards = this.cards.slice(0, num)
        if (deleteDrawed) {
            this.cards.splice(0, cards.length)
        }        
        return cards
    }
}