import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Hand as HandModel} from '../modules/Hand'
import {Card as CardModel} from '../modules/Card'
import Card from './Card'

interface HandProps extends DefaultProps {
    hand: HandModel;
    mustPlayCard: boolean;
    playCard?: Function;
}

@inject(injector)
@observer
class Hand extends React.Component<HandProps> {
    constructor(props: HandProps) {
        super(props);
        this.state = {
        };
    }

    handleCardClick = (c: CardModel) => {
        this.props.playCard && this.props.playCard(c)
    }

    renderCards(){
        return this.props.hand.objects.map( (c, k) => {
            return <Card 
                        key={k} 
                        card={c}
                        canClick={this.props.mustPlayCard}
                        clicked={false}
                        onClick={() => this.handleCardClick(c)}
                    />
        })
    }

    render() {
        let mustPlayCardClass = this.props.mustPlayCard ? ' hand-must-play-card' : ''

        return (
            <div className={'hand' + mustPlayCardClass}>
                {this.renderCards()}
            </div>
        );
    }
}

export default Hand;