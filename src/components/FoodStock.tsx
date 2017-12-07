import * as React from 'react';
import {Stock as StockModel} from '../modules/Stock'

interface StockProps {
    stock: StockModel;
}

class FoodStock extends React.PureComponent<StockProps> {
    
    constructor(props: StockProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="food-stock">
                Food : {this.props.stock.stockSize}
            </div>
        );
    }
}

export default FoodStock;