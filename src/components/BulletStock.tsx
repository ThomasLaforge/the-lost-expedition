import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Stock as StockModel} from '../modules/Stock'

interface StockProps extends DefaultProps {
    stock: StockModel;
}

@inject(injector)
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