export class Road {

    public length: number;
    public position: number;

    constructor(length: number, position = 0){
        this.position = position
        this.length = length
    }

    progress(){
        this.position++
    }

    isComplete(){
        return this.position >= this.length - 1
    }

}