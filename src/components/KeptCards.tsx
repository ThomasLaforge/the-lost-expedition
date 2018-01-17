import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Card as CardModel} from '../modules/Card'
import Card from './Card'

interface KeptCardsProps extends DefaultProps {
    cards: CardModel[];
}

@inject(injector)
@observer
class KeptCards extends React.Component<KeptCardsProps> {
    
    constructor(props: KeptCardsProps) {
        super(props);
        this.state = {
        };
    }

    renderKeptCards(){
        return this.props.cards.map( (c, k) => {
            return <Card key={k} card={c} />
        })
    }

    render() {
        return (
            <div className="KeptCards">
                {this.renderKeptCards()}
            </div>
        );
    }
}

export default KeptCards;