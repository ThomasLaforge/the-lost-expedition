import * as React from 'react';
import {observer} from 'mobx-react';

import {Stock as StockModel} from '../modules/Stock'

interface StockProps {
    stock: StockModel;
}

@observer
class BulletStock extends React.Component<StockProps> {
    
    constructor(props: StockProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="food-stock">
                Bullets : {this.props.stock.stockSize}
            </div>
        );
    }
}

export default BulletStock;