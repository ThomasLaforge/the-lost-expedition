import {observable} from 'mobx'

import {Card} from './Card'

export class Stack {

    @observable private _objects: Card[];

    constructor(objects: Card[] = []){
        this.objects = objects
    }

    get(index: number){
        return index >= 0 && index < this.objects.length && this.objects[index]
    }

    add(elt: Card, end = true){
        if(end){
            this.objects.push(elt)
        }
        else {
            this.objects.unshift(elt)
        }
    }

    addAndOrder(elt: Card, order?: boolean, end = false){
        this.add(elt)
        order && this.order()
    }

    order(){
        this.objects.sort(function (a, b) {
            return a.number - b.number;
        });
    }

    shuffle(){
        this.objects = this.objects.sort(() => Math.random() - 0.5)
    }

	public get objects(): Card[] {
		return this._objects;
	}
	public set objects(value: Card[]) {
		this._objects = value;
	}
    
}