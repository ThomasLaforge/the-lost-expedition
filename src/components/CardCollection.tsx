import * as React from 'react';
import {observer} from 'mobx-react';

import Card from './Card'
import {Card as CardModel} from '../modules/Card'
import {Deck} from '../modules/Deck'

interface CardCollectionProps {
}
interface CardCollectionState {
    cards: CardModel[]
}

@observer
class CardCollection extends React.Component<CardCollectionProps, CardCollectionState> {
    constructor(props: CardCollectionProps) {
        super(props);
        this.state = {
            cards: new Deck(null, false).cards
        };
    }

    renderCards(){
        return this.state.cards.map( (c, k) => <Card key={k} imgMode={true} card={c} />)
    }

    render() {
        return (
            <div className='card-collection'>
                {this.renderCards()}
            </div>
        );
    }
}

export default CardCollection;