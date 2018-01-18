import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import BulletStock from './BulletStock'
import FoodStock from './FoodStock'

interface StockProps extends DefaultProps {
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
                <BulletStock />
                <FoodStock />
            </div>
        );
    }
}

export default Stocks;