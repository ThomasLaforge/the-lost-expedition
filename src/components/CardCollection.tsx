import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Card from './Card'
import {Card as CardModel} from '../modules/Card'
import {Deck} from '../modules/Deck'
import {Store, UIStore} from '../modules/Store'

interface CardCollectionProps extends DefaultProps {
    showCollection?: boolean
}
interface CardCollectionState {
    cards: CardModel[]
    showCollection: boolean
}

@inject(injector)
@observer
class CardCollection extends React.Component<CardCollectionProps, CardCollectionState> {
    constructor(props: CardCollectionProps) {
        super(props);
        this.state = {
            cards: new Deck(null, false).cards,
            showCollection: !!this.props.showCollection
        };
    }

    renderCards(){
        return this.state.cards.map( (c, k) => <Card key={k} imgMode={true} card={c} />)
    }

    render() {
        return (
            <div className='card-collection'>
                <button onClick={() => this.setState({showCollection: !this.state.showCollection})}>
                    {this.state.showCollection ? 'hide collection' : 'show collection'}
                </button>
                {this.state.showCollection && this.renderCards()}
            </div>
        );
    }
}

export default CardCollection;