import {Card} from './Card'
import * as Utils from '../../utils/Utils'

export interface Ranking {
    name: string,
    value: number
}

export class Poker {
    judgeRanking(originalCards: Card[]): Ranking {
        const cards: Card[] = []
        cards.splice(0, 0, ...originalCards)

        let sortedCard = cards.sort((card1, card2) => {
            return card1.num - card2.num
        });

        const isFlush = sortedCard.every((card) => card.mark === sortedCard[0].mark);

        const isStraight = (() => {
            for (let i = 1; i < sortedCard.length; i++) {
                if (sortedCard[i - 1].num + 1 !== sortedCard[i].num) {
                    return false;
                }
            }
            return true;
        })();

        const counts = Utils.count(cards.map(card => card.num))
        counts.sort(function (a, b) {
            if (a.count < b.count) return 1
            if (a.count > b.count) return -1
            return 0
        });
        const maxHit = counts[0].count
        const secondHit = counts[1].count

        // TODO Royal flush
        if (isFlush && isStraight) {
            return {name: 'StraightFlush', value: 8}
        } else if (maxHit === 4) {
            return {name: 'Quads', value: 4}
        } else if (maxHit === 3 && secondHit === 2) {
            return {name: 'FullHouse', value: 2}
        } else if (isFlush) {
            return {name: 'Flush', value: 2}
        } else if (isStraight) {
            return {name: 'Straight', value: 2}
        } else if (maxHit === 3) {
            return {name: 'Trips', value: 2}
        } else if (maxHit === 2 && secondHit === 2) {
            return {name: 'TwoPair', value: 2}
        } else if (maxHit === 2) {
            return {name: 'Pair', value: 2}
        } else {
            return {name: 'Non', value: 0}
        }
    }
}
