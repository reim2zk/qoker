import {Circuit} from '../quantum-circuit/Circuit'
import {OneGate, GateType} from '../quantum-circuit/Gate'
import {Porker} from '../porker/Porker'
import {Card} from '../porker/Card'
import {Deck} from '../porker/Deck'
import {simulate} from '../../utils/Simulate'

export class Qorker {
    porker: Porker
    cards: Card[]
    deck: Deck
    circuit: Circuit
    result: number[][]
    score: number | null = null
    numMeasure: number
    static NUM_CARDS = 5

    constructor() {
        this.porker = new Porker()
        this.deck = new Deck()
        this.deck.shuffle()
        this.cards = this.deck.drawCards(Qorker.NUM_CARDS)!

        this.circuit = Circuit.empty()

        const gs = this.circuit.oneGates
        gs.push(new OneGate(0, 0, GateType.H))
        gs.push(new OneGate(0, 1, GateType.X))
        gs.push(new OneGate(0, 2, GateType.Y))
        gs.push(new OneGate(2, 2, GateType.Z))
        gs.push(new OneGate(0, 3, GateType.Z))

        this.result = [
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 1]
          ]
        this.numMeasure = 100
    }

    start() {
        this.deck.shuffle()
        const cards = this.deck.drawCards(Qorker.NUM_CARDS)!
        this.cards.splice(0, cards.length, ...cards)
    }

    calculate() {
        const subCards = this.deck.drawCards(Qorker.NUM_CARDS)
        if(!subCards) {
            console.log('deck become empty')
            return
        }
        let score = 0.0
        for(let i = 0; i < this.numMeasure; i++) {
            const qubits = simulate(this.circuit)
            const measures = qubits.map(v => v.measure())
            const resultCards: Card[] = measures.map((v, i) => 
                v === 0 ? this.cards[i] : subCards[i])
            score += this.porker.score(resultCards)
        }
        score = score / this.numMeasure

        this.score = score
    }


}
