import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Stock as StockModel} from '../modules/Stock'

interface StockProps extends DefaultProps {
}

@inject(injector)
@observer
class BulletStock extends React.Component<StockProps> {
    
    constructor(props: StockProps) {
        super(props);
        this.state = {
        };
    }

    get stock(){ return this.props.game.player.bulletStock }

    renderBullet(){
        let bullets = []
        for (let i = 0; i < this.stock.stockSize; i++) {
            bullets.push(<div className='bullet-stock-elt' />)            
        }
        return bullets
    }

    render() {
        return (
            <div className="bullet-stock">
                {this.renderBullet()}
            </div>
        );
    }
}

export default BulletStock;