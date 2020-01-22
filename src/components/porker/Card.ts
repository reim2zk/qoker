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
  static deck(): Card[] {
    const cards: Card[] = []
    for(let i = 1; i <= 12; i++) {
      cards.push(new Card(i, CardMark.Spade))
    }
    return cards
  }
}
