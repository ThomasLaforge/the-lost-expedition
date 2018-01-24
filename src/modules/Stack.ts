import {observable} from 'mobx'

import {Side} from './TheLostExpedition'
import {Card} from './Card'

export class Stack<T> {

    @observable private _objects: T[];
    @observable private _maxNbobjects: number;
    @observable private _lock: boolean;

    constructor(objects: T[] = [], maxNbobjects?: number, lock = false){
        this.objects = objects
        if(maxNbobjects){
            this.maxNbobjects = maxNbobjects
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
        return (this.maxNbobjects || this.maxNbobjects === 0) && this.objects.length === this.maxNbobjects
    }

    get length(){
        return this.objects.length
    }

    get(index: number){
        return index >= 0 && index < this.objects.length && this.objects[index]
    }

    getFirst(){
        return this.get(0)
    }

    getNextCards(){
        return this.objects.slice(1, this.length - 1)
    }

    getNextOne(){
        return this.get(1)
    }

    getLastOne(){
        return this.get(this.objects.length - 1)
    }

    indexOf(elt: T){
        return this.objects.indexOf(elt)
    }

    switch(objects: T[]){
        if(objects.length === 2){
            let indexCardOne = this.indexOf(objects[0])
            let indexCardTwo = this.indexOf(objects[1])
            this.objects[indexCardTwo] = objects[0]
            this.objects[indexCardOne] = objects[1]
        }
        else {
            throw new Error("switch objects but not exactly two objects")
        }
    }

    remove(c: T){
        this.objects.splice(this.objects.indexOf(c), 1)
        if(this.length === 0){
            this.unlock()
        }
    }

    add(elt: T, side = Side.Right){
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

    shuffle(){
        this.objects = this.objects.sort(() => Math.random() - 0.5)
    }

	public get objects(): T[] {
		return this._objects;
	}
	public set objects(value: T[]) {
		this._objects = value;
    }
	public get maxNbobjects(): number {
		return this._maxNbobjects;
	}
	public set maxNbobjects(value: number) {
		this._maxNbobjects = value;
    }
	public get lock(): boolean {
		return this._lock;
	}
	public set lock(value: boolean) {
		this._lock = value;
	}
    
}

export class CardStack extends Stack<Card> {

    constructor(objects: Card[] = [], maxNbobjects?: number, lock = false){
        super(objects, maxNbobjects, lock)
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

    get cards(){
        return this.objects
    }
}

