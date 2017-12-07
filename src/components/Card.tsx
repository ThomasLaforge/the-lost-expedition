import * as React from 'react';
import {observer} from 'mobx-react';

import {Card as CardModel} from '../modules/Card'

interface CardProps {
    clicked?: boolean;
    card: CardModel
}

@observer
class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
        };
    }

    renderActions(){
        return <div>Actions: </div>
    }

    render() {
        let card = this.props.card
        return (
            <div className={'card card-' + card.number}>
                <div className="card-actions">
                    {this.renderActions()}
                </div>
                <div className="card-title">
                    <div className="card-number">{card.number}</div>
                    <div className="card-title-separator">-</div>
                    <div className="card-name">{card.name}</div>
                </div>
            </div>
        );
    }
}

export default Card;