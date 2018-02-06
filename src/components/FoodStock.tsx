import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Stock as StockModel} from '../modules/Stock'

interface StockProps extends DefaultProps {
}

@inject(injector)
@observer
class FoodStock extends React.Component<StockProps> {
    
    constructor(props: StockProps) {
        super(props);
        this.state = {
        };
    }

    get stock(){ return this.props.game.player.foodStock }

    renderFood(){
        let food = []
        for (let i = 0; i < this.stock.stockSize; i++) {
            food.push(<div className='food-stock-elt' key={i}>Food</div>)            
        }
        return food
    }

    render() {
        return (
            <div className="food-stock">
                {this.renderFood()}
            </div>
        );
    }
}

export default FoodStock;