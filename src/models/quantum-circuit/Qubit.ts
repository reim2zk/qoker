export enum QubitType {Q0, Q1}

export class Qubit {
    type: QubitType
    index: number
    constructor(type: QubitType, index: number) {
        this.type = type
        this.index = index
    }
    toString(): string {
        switch(this.type) {
            case QubitType.Q0:
                return '|0>'
            case QubitType.Q1:
                return '|1>'
        }
    }
    swapQubit(): void {
        switch(this.type) {
            case QubitType.Q0:
                this.type = QubitType.Q1
                break
            case QubitType.Q1:
                this.type = QubitType.Q0
                break
        }
    }
}