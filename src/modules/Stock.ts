const MAX_STOCK_SIZE = 100

export class Stock {

    private _stockSize: number;
    private _maxStockSize: number;

    constructor(initialStockSize = 3, maxStockSize = MAX_STOCK_SIZE){
        this.stockSize = initialStockSize
    }

    add(nb = 1){
        let ok = true
        
        this.stockSize += nb
        if(this.stockSize > this.maxStockSize) {
            ok = false
            this.stockSize = this.maxStockSize
        }

        return ok
    }
    
    remove(nb = 1){
        let ok = true
        
        this.stockSize -= nb
        if(this.stockSize < 0){
            ok = false            
            this.stockSize = 0
        }
        
        return ok
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
    

}