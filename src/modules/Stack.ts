import {observable} from 'mobx'

import {Card} from './Card'
import {Side} from './TheLostExpedition'

export class Stack {

    @observable private _cards: Card[];
    @observable private _maxNbcards: number;
    @observable private _lock: boolean;

    constructor(cards: Card[] = [], maxNbcards?: number, lock = false){
        this.cards = cards
        if(maxNbcards){
            this.maxNbcards = maxNbcards
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
        return (this.maxNbcards || this.maxNbcards === 0) && this.cards.length === this.maxNbcards
    }

    get length(){
        return this.cards.length
    }

    get(index: number){
        return index >= 0 && index < this.cards.length && this.cards[index]
    }

    getFirst(){
        return this.get(0)
    }

    getNextCards(){
        return this.cards.slice(1, this.length - 1)
    }

    getNextOne(){
        return this.get(1)
    }

    getLastOne(){
        return this.get(this.cards.length - 1)
    }

    indexOf(elt: Card){
        return this.cards.indexOf(elt)
    }

    switch(cards: Card[]){
        if(cards.length === 2){
            let indexCardOne = this.indexOf(cards[0])
            let indexCardTwo = this.indexOf(cards[1])
            this.cards[indexCardTwo] = cards[0]
            this.cards[indexCardOne] = cards[1]
        }
        else {
            throw new Error("switch cards but not exactly two cards")
        }
    }

    remove(c: Card){
        this.cards.splice(this.cards.indexOf(c), 1)
        if(this.length === 0){
            this.unlock()
        }
    }

    add(elt: Card, side = Side.Right){
        if(side === Side.Right){
            this.cards.push(elt)
        }
        else {
            this.cards.unshift(elt)
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
        this.cards = this.cards.sort(function (a, b) {
            return a.number - b.number;
        });
    }

    shuffle(){
        this.cards = this.cards.sort(() => Math.random() - 0.5)
    }

	public get cards(): Card[] {
		return this._cards;
	}
	public set cards(value: Card[]) {
		this._cards = value;
    }
	public get maxNbcards(): number {
		return this._maxNbcards;
	}
	public set maxNbcards(value: number) {
		this._maxNbcards = value;
    }
	public get lock(): boolean {
		return this._lock;
	}
	public set lock(value: boolean) {
		this._lock = value;
	}
    
    
    
}