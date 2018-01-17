import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Stock as StockModel} from '../modules/Stock'
import BulletStock from './BulletStock'
import FoodStock from './FoodStock'

interface StockProps extends DefaultProps {
    foodStock: StockModel;
    bulletStock: StockModel;
}

@inject(injector)
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