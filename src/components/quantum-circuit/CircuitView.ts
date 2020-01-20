export class CircuitView {
    unitWidth: number
    unitHeight: number
    gateRadius: number
    dotRadius: number    
    qbitWidth: number
    measureWidth: number
    constructor(unitWidth: number, unitHeight: number, gateRadius: number) {
        this.unitHeight = unitHeight
        this.unitWidth = unitWidth
        this.gateRadius = gateRadius
        this.dotRadius = gateRadius * 0.3
        this.qbitWidth = unitWidth * 1.5
        this.measureWidth = unitWidth * 1.3
    }
    static empty(): CircuitView {
        return new CircuitView(20, 20, 15)
    }
    // width(): number { 
    //     return this.qbitWidth + circuit.numPosition * this.unitWidth + this.measureWidth
    // }
    // height(): number { 
    //     return (circuit.numQbit+1) * circuitView.unitHeight 
    // }
    // position(x: number): number | PositionType.InitQbit | PositionType.Measure { 
    //     if(x < this.qbitWidth) {
    //         return PositionType.InitQbit
    //     } else if (x > this.qbitWidth + this.unitWidth * 10) {
    //         return PositionType.Measure
    //     } else {
    //         return Math.floor((x - this.qbitWidth) / this.unitWidth) 
    //     }
    // }
    // indexQbit(y: number): number { 
    //     return Math.floor(y / this.unitHeight) 
    // }
    x(position: number): number { 
        return (position + 0.5) * this.unitWidth + this.qbitWidth
    }
    y(indexQbit: number): number { 
        return (indexQbit + 0.5) * this.unitHeight 
    }    
}