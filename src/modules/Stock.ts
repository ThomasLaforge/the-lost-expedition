const MAX_STOCK_SIZE = 100

export class Stock {

    private _stockSize: number

    constructor(){}

    add(nb = 1){
        this.stockSize += nb
        if(this.stockSize > MAX_STOCK_SIZE){
            this.stockSize = MAX_STOCK_SIZE
        }
    }
    remove(nb = 1){
        this.stockSize -= nb
        if(this.stockSize < 0){
            this.stockSize = 0
        }
    }

    public get stockSize(){
        return this._stockSize
    }
    private set stockSize(stockSize: number){
        this._stockSize = stockSize
    }

}