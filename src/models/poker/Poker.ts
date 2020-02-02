import {Card} from './Card'
import * as Utils from '../../utils/Utils'

export interface Ranking {
    name: string,
    value: number
}

const StraightFlush: Ranking = {name: "Straight Flush", value: 50}
const Quads: Ranking = {name: 'Quads', value: 20}
const FullHouse: Ranking = {name: 'Full House', value: 6}
const Flush: Ranking = {name: 'Flush', value: 5}
const Straight: Ranking = {name: 'Straight', value: 4}
const Trips: Ranking = {name: 'Trips', value: 3}
const TwoPairs: Ranking = {name: 'TwoPair', value: 2}
const Pair: Ranking = {name: 'Pair', value: 1}
const Non: Ranking = {name: 'Non', value: 0}
export function allRankings(): Ranking[] {
    return [StraightFlush, Quads, FullHouse, Flush, Straight, Trips, TwoPairs, Pair, Non]
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
            return StraightFlush
        } else if (maxHit === 4) {
            return Quads
        } else if (maxHit === 3 && secondHit === 2) {
            return FullHouse
        } else if (isFlush) {
            return Flush
        } else if (isStraight) {
            return Straight
        } else if (maxHit === 3) {
            return Trips
        } else if (maxHit === 2 && secondHit === 2) {
            return TwoPairs
        } else if (maxHit === 2) {
            return Pair
        } else {
            return Non
        }
    }
}
