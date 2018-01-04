import {observable} from 'mobx'

import { Resource } from './Resource'
import { Stock } from './Stock'

export class Hero {

    @observable private _resource: Resource;
    @observable private _pvStock: Stock;
    @observable private _name: string;
    @observable private _imgPath: string;

    constructor(name: string, resource: Resource, pvStock = new Stock(undefined, 4)){
        this.name = name
		this.pvStock = pvStock
		this.resource = resource
    }

	isAlive(){
		return this.pvStock.stockSize > 0
	}
	isDead(){
		return !this.isAlive()
	}
	isFullLife(){
		return this.pvStock.stockSize === this.pvStock.maxStockSize
	}
    winPV(nb = 1){
        return this.pvStock.add(nb)
    }
    losePV(nb = 1){
        return this.pvStock.remove(nb)
	}
	die(){
		this.pvStock.empty()
	}

    // Getters / Setters
	public get resource(): Resource {
		return this._resource;
	}
	public set resource(value: Resource) {
		this._resource = value;
	}
	public get pvStock(): Stock {
		return this._pvStock;
	}
	public set pvStock(value: Stock) {
		this._pvStock = value;
	}
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
	public get imgPath(): string {
		return this._imgPath;
	}
	public set imgPath(value: string) {
		this._imgPath = value;
	}

}