
export class Edge {
    to: string;
    from: string;
    smooth : Smooth;
    title: string;

    constructor(to: string, from: string,title: string, type: string = 'dynamic', roundness: number = 0){
        this.to = to;
        this.from = from;
        this.title = title;
        this.smooth = new Smooth(type,roundness)
    }
}

class Smooth {
    type: string;
    roundness: number;
    constructor(type: string, roundness: number){
        this.roundness = roundness;
        this.type = type;
    }
}