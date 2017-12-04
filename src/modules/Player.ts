import { Stock } from './Stock'
import { Hero } from './Hero'

export class Player {

    private _foodStock: Stock
    private _bulletStock: Stock
    private _name: string
    private _heroes: Hero[]

    constructor(foodStock = new Stock(), bulletStock = new Stock(), name = 'anonymous', heroes = [] ){
        this._foodStock = foodStock
        this._bulletStock = bulletStock
        this._name = name
        this._heroes = heroes
    }

}