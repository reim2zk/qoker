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
  static SampleCards(): Card[] {
    return [
      new Card(11, CardMark.Diamond),
      new Card(12, CardMark.Diamond),
      new Card(2, CardMark.Spade),
      new Card(2, CardMark.Club),
      new Card(13, CardMark.Heart)
    ]
  }
  static SampleSubCards(): Card[] {
    return [
      new Card(7, CardMark.Heart),
      new Card(3, CardMark.Diamond),
      new Card(9, CardMark.Diamond),
      new Card(10, CardMark.Club),
      new Card(8, CardMark.Spade)
    ]
  }
}
