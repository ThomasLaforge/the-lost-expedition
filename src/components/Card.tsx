import * as React from 'react';
import {Card as CardModel} from '../modules/Card'

interface CardProps {
    clicked?: boolean;
    card: CardModel
}

class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="card">
                {this.props.clicked}
                {this.props.card.number}
            </div>
        );
    }
}

export default Card;