export class Road {

    private _length: number;
    private _position: number;

    constructor(length = 9, position = 0){
        this.position = position
        this.length = length
    }

    progress(){
        this.position++
    }

    isComplete(){
        return this.position >= this.length - 1
    }

    // Getters / Setters
	public get length(): number {
		return this._length;
	}
	public set length(value: number) {
		this._length = value;
	}
	public get position(): number {
		return this._position;
	}
	public set position(value: number) {
		this._position = value;
	}
    

}