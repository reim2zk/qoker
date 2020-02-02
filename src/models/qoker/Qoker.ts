import {Result, Row} from './Result'
import {Circuit} from '../quantum-circuit/Circuit'
import {Poker} from '../poker/Poker'
import {Card} from '../poker/Card'
import {Deck} from '../poker/Deck'
import {simulate} from '../../utils/Simulate'
import * as Utils from '../../utils/Utils'


export enum Status {
    Welcome,
    Choosing,
    Result,
    Congurats,
    GameOver
}

export class Qoker {
    poker: Poker
    cards: Card[]
    subCards: Card[]
    deck: Deck
    circuit: Circuit
    result: Result
    point: number
    remainingCount: number
    status: Status

    numMeasure: number = 100
    static NUM_CARDS = 5
    static INITIAL_COUNT = 10
    static INITIAL_POINT = 100

    constructor() {
        this.poker = new Poker()
        this.deck = new Deck()
        this.deck.shuffle()
        this.cards = this.deck.drawCards(Qoker.NUM_CARDS, false)!
        this.subCards = this.deck.drawCards(Qoker.NUM_CARDS, false)!

        this.circuit = Circuit.empty()
        this.circuit.numPosition = 10
        this.result = { score: 0, rows: []}
        this.point = Qoker.INITIAL_POINT
        this.remainingCount = Qoker.INITIAL_COUNT
        this.status = Status.Welcome
    }

    start() {
        this.status = Status.Choosing

        this.deck.shuffle()
        const cards = this.deck.drawCards(Qoker.NUM_CARDS, false)!
        this.cards.splice(0, cards.length, ...cards)

        this.deck.shuffle()
        const subCards = this.deck.drawCards(Qoker.NUM_CARDS, false)!
        this.subCards.splice(0, subCards.length, ...subCards)

        this.circuit.clean()
    }

    calculate() {
        this.result = this.calculateResult()
        this.point *= this.result.score
        this.remainingCount--

        if(this.point < 1) {
            this.status = Status.GameOver
        }
        else if(this.remainingCount === 0) {
            this.status = Status.Congurats
        } else {
            this.status = Status.Result
        }
    }

    continue() {
        this.status = Status.Choosing
    }

    finish() {
        this.status = Status.Welcome
        this.point = Qoker.INITIAL_POINT
        this.remainingCount = Qoker.INITIAL_COUNT
    }

    isWelcome(): boolean { return this.status === Status.Welcome }
    isChoosing(): boolean { return this.status === Status.Choosing }
    isResult(): boolean { return this.status === Status.Result }
    isCongrats(): boolean { return this.status === Status.Congurats }    
    isGameOver(): boolean { return this.status === Status.GameOver }

    private calculateResult(): Result {
        const values: number[] = []
        for(let i = 0; i < this.numMeasure; i++) {
            const qubits = simulate(this.circuit)
            const measures = qubits.map(v => v.measure())
            values.push(this.encode(measures))
        }

        const counts: {value: number, count: number}[] = Utils.count(values)

        const rows = counts.map(v => {
            const measures = this.decode(v.value)
            const cards: Card[] = measures.map((v, i) => 
                v === 0 ? this.cards[i] : this.subCards[i])
            const rank = this.poker.judgeRanking(cards)
            const res: Row = {
                measures: measures,
                count: v.count,
                prob: v.count / this.numMeasure,
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

        const score = this.calculateScore(rows)
        return { score: score, rows: rows}
    }

    private encode(measures: number[]): number {
        const result = measures.map((v, i) => v*2**i).reduce((a, b)=>a+b)
        return result
    }

    private decode(value: number): number[] {
        const result = []
        for(let i = 0; i < Qoker.NUM_CARDS; i++) {
            const v = value % 2
            value = Math.floor(value / 2)
            result.push(v)
        }
        return result
    }

    private calculateScore(rows: Row[]): number {
        return rows
            .map(v => v.rank.value * v.prob)
            .reduce((a, b) => a + b)
    }
}
