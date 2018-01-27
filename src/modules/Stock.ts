import {observable} from 'mobx'

const MAX_STOCK_SIZE = 100

export class Stock {

    @observable private _stockSize: number;
    @observable private _maxStockSize: number;
    @observable private _minStockSize: number;

    constructor(initialStockSize = 3, minStockSize = -1, maxStockSize = MAX_STOCK_SIZE){
        this.stockSize = initialStockSize
        this.maxStockSize = maxStockSize
        this.minStockSize = minStockSize
    }

    add(nb = 1){
        let canAdd = this.stockSize < this.maxStockSize
        
        if(canAdd) {
            this.stockSize += nb
        }

        return canAdd
    }
    
    remove(nb = 1){
        let canRemove = this.stockSize > this.minStockSize
        
        if(canRemove){
            this.stockSize -= nb    
        }
        
        return canRemove
    }

    empty(){
        this.stockSize = this.minStockSize;
    }

    // Getters / Setters
    public get stockSize(){
        return this._stockSize
    }
    public set stockSize(stockSize: number){
        this._stockSize = stockSize
    }
	public get maxStockSize(): number {
		return this._maxStockSize;
    }
	public set maxStockSize(value: number) {
		this._maxStockSize = value;
    }
	public get minStockSize(): number {
		return this._minStockSize;
	}
	public set minStockSize(value: number) {
		this._minStockSize = value;
	}

}