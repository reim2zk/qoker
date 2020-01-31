import {Card} from '../poker/Card'
import {Ranking} from '../poker/Poker'

export interface Row {
  measures: number[]
  count: number
  prob: number
  cards: Card[]
  rank: Ranking
}

export interface Result {
  score: number
  rows: Row[]
}
export function emptyResult(): Result {
  return {score: 0, rows: []}
}


