import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Card from './Card'
import {Card as CardModel} from '../modules/Card'
import {Deck} from '../modules/Deck'
import {Store, UIStore} from '../modules/Store'

interface CardCollectionProps extends DefaultProps {
}
interface CardCollectionState {
    cards: CardModel[]
}

@inject(injector)
@observer
class CardCollection extends React.Component<CardCollectionProps, CardCollectionState> {
    constructor(props: CardCollectionProps) {
        super(props);
        this.state = {
            cards: new Deck(null, false).cards
        };
    }

    renderCards(){
        return this.state.cards.map( (c, i) => <Card key={i} imgMode={true} card={c} />)
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