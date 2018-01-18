import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Card as CardModel} from '../modules/Card'
import Card from './Card'

interface KeptCardsProps extends DefaultProps {
}

@inject(injector)
@observer
class KeptCards extends React.Component<KeptCardsProps> {
    
    constructor(props: KeptCardsProps) {
        super(props);
        this.state = {
        };
    }

    get cards(){ return this.props.game.keptCards.objects }

    renderKeptCards(){
        return this.cards.map( (c, k) => {
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