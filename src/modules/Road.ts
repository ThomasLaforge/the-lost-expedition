import {observable} from 'mobx'

import {Difficulty} from './TheLostExpedition'

export class Road {

    @observable private _length: number;
    @observable private _position: number;

    constructor(difficulty: Difficulty, position = 0){
        this.position = position
        this.length = difficulty === Difficulty.Easy ? 7 : 9
    }

    progress(){
        let hasProgressed = this.position < this.length - 1
        if(hasProgressed){
            this.position++
        }
        return hasProgressed
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