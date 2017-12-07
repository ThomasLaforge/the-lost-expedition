import { Stock } from './Stock'
import { Card } from './Card'
import { Hand } from './Hand'
import { Hero } from './Hero'

export class Player {

    private _foodStock: Stock;
    private _bulletStock: Stock;
    private _name: string;
    private _heroes: Hero[];
    private _hand: Hand;

    constructor(foodStock = new Stock(), bulletStock = new Stock(), name = 'anonymous', heroes: Hero[] = [], hand = new Hand() ){
        this._foodStock = foodStock
        this._bulletStock = bulletStock
        this._name = name
        this._heroes = heroes
        this.hand = hand
    }

    // Wrappers
    addFood(nb = 1){
        return this.foodStock.add(nb)
    }
    removeFood(nb = 1){
        return this.foodStock.remove(nb)
    }
    nourrish(){
        return this.removeFood(1)
    }
    addBullet(nb = 1){
        return this.bulletStock.add(nb)
    }
    removeBullet(nb = 1){
        return this.bulletStock.remove(nb)
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
    public get heroes(){
        return this._heroes
    }
    public set heroes(heroes: Hero[]){
        this._heroes = heroes
    }
	public get hand(): Hand {
		return this._hand;
	}
	public set hand(value: Hand) {
		this._hand = value;
	}
    
}