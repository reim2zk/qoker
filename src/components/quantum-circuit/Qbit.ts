export enum QbitType {Q0, Q1}

export class Qbit {
    type: QbitType
    index: number
    measure: boolean
    constructor(type: QbitType, index: number, measure: boolean) {
        this.type = type
        this.index = index
        this.measure = measure
    }
    swapQbit(): void {
        switch(this.type) {
            case QbitType.Q0:
                this.type = QbitType.Q1
                break
            case QbitType.Q1:
                this.type = QbitType.Q0
                break
        }
    }
    swapMeasure(): void {
        this.measure = !this.measure
    }
}