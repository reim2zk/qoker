import {Card} from './Card'

export class Porker {
    score(cards: Card[]): number {
        return cards.map(v => v.num).reduce((a, b) => a + b)
    }
}
