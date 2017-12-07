import * as React from 'react';
import {observer} from 'mobx-react';

import {Stock as StockModel} from '../modules/Stock'
import BulletStock from './BulletStock'
import FoodStock from './FoodStock'

interface StockProps {
    foodStock: StockModel;
    bulletStock: StockModel;
}

@observer
class Stocks extends React.Component<StockProps> {
    
    constructor(props: StockProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="stocks">
                <BulletStock stock={this.props.bulletStock} />
                <FoodStock stock={this.props.foodStock} />
            </div>
        );
    }
}

export default Stocks;