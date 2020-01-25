export enum CardMark {
  Club = 'club', 
  Spade = 'spade', 
  Heart = 'heart', 
  Diamond = 'diamond'
}

export class Card {
  num: number
  mark: CardMark
  constructor(num: number, mark: CardMark) {
    this.num = num
    this.mark = mark
  }
}
