import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Deck as DeckModel} from '../modules/Deck'

interface DeckProps extends DefaultProps {
}

@inject(injector)
@observer
class Deck extends React.Component<DeckProps> {

    constructor(props: DeckProps) {
        super(props);
        this.state = {
        };
    }

    get deck(){ return this.props.game.deck}

    render() {
        return (
            <div className="deck">
                {this.deck.length() > 0 ? 'not empty' : 'empty'}
            </div>
        );
    }
}

export default Deck;