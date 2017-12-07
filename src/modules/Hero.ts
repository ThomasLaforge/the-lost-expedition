import { Resource } from './TheLostExpedition'
import { Stock } from './Stock'

export class Hero {

    private _resource: Resource;
    private _pvStock: Stock;
    private _name: string;
    private _imgPath: string;

    constructor(name: string, resource: Resource, pvStock = new Stock(undefined, 4)){
        this.name = name
        this.pvStock = pvStock
    }

	alive(){
		return this.pvStock.stockSize > 0
	}
	dead(){
		return !this.alive()
	}
    winPV(nb = 1){
        return this.pvStock.add(nb)
    }
    losePV(nb = 1){
        return this.pvStock.remove(nb)
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