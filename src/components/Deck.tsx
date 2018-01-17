import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Deck as DeckModel} from '../modules/Deck'

interface DeckProps extends DefaultProps {
    deck: DeckModel;
}

@inject(injector)
@observer
class Deck extends React.Component<DeckProps> {

    constructor(props: DeckProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="deck">
                {this.props.deck.length() > 0 ? 'not empty' : 'empty'}
            </div>
        );
    }
}

export default Deck;