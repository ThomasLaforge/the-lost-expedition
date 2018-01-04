import {observable} from 'mobx'

import { Stock } from './Stock'
import { Card } from './Card'
import { Hand } from './Hand'
import { HeroesCollection } from './HeroesCollection'

export class Player {

    @observable private _foodStock: Stock;
    @observable private _bulletStock: Stock;
    @observable private _name: string;
    @observable private _heroesCollection: HeroesCollection;
    @observable private _hand: Hand;

    constructor(heroes = new HeroesCollection([]), foodStock = new Stock(), bulletStock = new Stock(0), name = 'anonymous', hand = new Hand() ){
        this._foodStock = foodStock
        this._bulletStock = bulletStock
        this._name = name
        this._heroesCollection = heroes
        this.hand = hand
    }

    // Wrappers
    addFood(nb = 1){
        return this.foodStock.add(nb)
    }
    removeFood(nb = 1){
        return this.foodStock.remove(nb)
    }
    nourrish() {
        return this.removeFood(1)
    }
    eat() {
        return this.nourrish()
    }
    getFood(){
        return this.addFood();
    }
    addBullet(nb = 1){
        return this.bulletStock.add(nb)
    }
    removeBullet(nb = 1){
        return this.bulletStock.remove(nb)
    }
    shot(){
        return this.removeBullet()
    }
    getBullet(){
        return this.addBullet();
    }

    getNewCards(cards: Card[]){
        cards = Array.isArray(cards) ? cards : [cards]
        cards.forEach(c => {
            this.hand.add(c)
        })
    }

    // Getters / Setters
    public get bulletStock(){
        return this._bulletStock
    }
    public set bulletStock(bulletStock: Stock){
        this._bulletStock = bulletStock
    }
    public get foodStock(){
        return this._foodStock
    }
    public set foodStock(foodStock: Stock){
        this._foodStock = foodStock
    }
    public get name(){
        return this._name
    }
    public set name(name: string){
        this._name = name
    }
    public get heroesCollection(){
        return this._heroesCollection
    }
    public set heroesCollection(heroes: HeroesCollection){
        this._heroesCollection = heroes
    }
	public get hand(): Hand {
		return this._hand;
	}
	public set hand(value: Hand) {
		this._hand = value;
	}
    
}