import {observable} from 'mobx'

import {Card} from './Card'
import {Side} from './TheLostExpedition'

export class Stack {

    @observable private _objects: Card[];
    @observable private _maxNbObjects: number;
    @observable private _lock: boolean;

    constructor(objects: Card[] = [], maxNbObjects?: number, lock = false){
        this.objects = objects
        if(maxNbObjects){
            this.maxNbObjects = maxNbObjects
        }
        this.lock = lock
    }

    isLock(){
        return this.lock;
    }

    lockIt(){
        this.lock = true
    }
    unlock(){
        this.lock = false
    }

    isFull(){
        return (this.maxNbObjects || this.maxNbObjects === 0) && this.objects.length === this.maxNbObjects
    }

    length(){
        return this.objects.length
    }

    get(index: number){
        return index >= 0 && index < this.objects.length && this.objects[index]
    }

    getFirst(){
        return this.get(0)
    }

    getNextOne(){
        return this.get(1)
    }

    getLastOne(){
        return this.get(this.objects.length - 1)
    }

    indexOf(elt: Card){
        return this.objects.indexOf(elt)
    }

    switch(cards: Card[]){
        if(cards.length === 2){
            let indexCardOne = this.indexOf(cards[0])
            let indexCardTwo = this.indexOf(cards[1])
            this.objects[indexCardTwo] = cards[0]
            this.objects[indexCardOne] = cards[1]
        }
        else {
            throw new Error("switch cards but not exactly two cards")
        }
    }

    remove(c: Card){
        this.objects.splice(this.objects.indexOf(c), 1)
        if(this.length() === 0){
            this.unlock()
        }
    }

    add(elt: Card, side = Side.Right){
        if(side === Side.Right){
            this.objects.push(elt)
        }
        else {
            this.objects.unshift(elt)
        }
        if(this.isFull()){
            this.lockIt()
        }
    }

    addAndOrder(elt: Card, order?: boolean, side = Side.Right){
        this.add(elt, side)
        order && this.order()
    }

    order(){
        this.objects = this.objects.sort(function (a, b) {
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
	public get maxNbObjects(): number {
		return this._maxNbObjects;
	}
	public set maxNbObjects(value: number) {
		this._maxNbObjects = value;
    }
	public get lock(): boolean {
		return this._lock;
	}
	public set lock(value: boolean) {
		this._lock = value;
	}
    
    
    
}