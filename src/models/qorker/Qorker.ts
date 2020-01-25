import {Circuit} from '../quantum-circuit/Circuit'
import {OneGate, GateType} from '../quantum-circuit/Gate'
import {Porker, Ranking} from '../porker/Porker'
import {Card} from '../porker/Card'
import {Deck} from '../porker/Deck'
import {simulate} from '../../utils/Simulate'
import * as Utils from '../../utils/Utils'

interface ResultRow {
    measures: number[]
    count: number
    prob: number
    cards: Card[]
    rank: Ranking
}

export class Qorker {
    porker: Porker
    cards: Card[]
    subCards: Card[]
    deck: Deck
    circuit: Circuit
    resultRows: ResultRow[]
    score: number | null = null
    numMeasure: number
    static NUM_CARDS = 5

    constructor() {
        this.porker = new Porker()
        this.deck = new Deck()
        this.deck.shuffle()
        this.cards = this.deck.drawCards(Qorker.NUM_CARDS)!
        this.subCards = this.deck.drawCards(Qorker.NUM_CARDS)!

        this.circuit = Circuit.empty()

        const gs = this.circuit.gates
        gs.push(new OneGate(0, 0, GateType.H))
        // gs.push(new OneGate(0, 1, GateType.X))
        // gs.push(new OneGate(0, 2, GateType.Y))
        // gs.push(new OneGate(2, 2, GateType.Z))
        // gs.push(new OneGate(0, 3, GateType.Z))

        this.resultRows = []
        this.numMeasure = 100
    }

    start() {
        this.deck.shuffle()
        const cards = this.deck.drawCards(Qorker.NUM_CARDS)!
        this.cards.splice(0, cards.length, ...cards)

        this.deck.shuffle()
        const subCards = this.deck.drawCards(Qorker.NUM_CARDS)!
        this.subCards.splice(0, subCards.length, ...subCards)
    }

    calculate() {
        this.resultRows = this.calculateResultRows()
        this.score = this.calculateScore()
    }

    private calculateResultRows(): ResultRow[] {
        const values: number[] = []
        for(let i = 0; i < this.numMeasure; i++) {
            const qubits = simulate(this.circuit)
            const measures = qubits.map(v => v.measure())
            values.push(this.encode(measures))
        }

        const counts: {value: number, count: number}[] = Utils.count(values)

        const rows = counts.map(v => {
            const measures = this.decode(v.value)
            const count = v.count
            const cards: Card[] = measures.map((v, i) => 
                v === 0 ? this.cards[i] : this.subCards[i])
            const rank = this.porker.judgeRanking(cards)
            const res: ResultRow = {
                measures: measures,
                count: count,
                prob: count / this.numMeasure,
                cards: cards,
                rank: rank
            }
            return res
        })

        rows.sort(function (a, b) {
            if (a.count < b.count) return 1
            if (a.count > b.count) return -1
            return 0
        })

        return rows
    }

    private encode(measures: number[]): number {
        return measures.map((v, i) => v*2**i).reduce((a, b)=>a+b)
    }

    private decode(value: number): number[] {
        const result = []
        for(let i = 0; i < Qorker.NUM_CARDS; i++) {
            result.push(value % (2**(i+1)))
        }
        return result
    }

    private calculateScore(): number {
        return this.resultRows
            .map(v => v.rank.value * v.prob)
            .reduce((a, b) => a + b)
    }
}
