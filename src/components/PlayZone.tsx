import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Side} from '../modules/TheLostExpedition'

import MorningCardSelection from './MorningCardSelection';
import EveningCardSelection from './EveningCardSelection';
import ResolutionBox from './ResolutionBox';
import Card from './Card'

interface PlayZoneProps extends DefaultProps {
}

interface PlayZoneState {
}

@inject(injector)
@observer
class PlayZone extends React.Component<PlayZoneProps, PlayZoneState> {
    
    constructor(props: PlayZoneProps) {
        super(props);
        this.state = {
        };
    }

    get playedCards(){ return this.props.game.playedCards }

    renderCards(){
        return this.playedCards.cards.map( (c, k) => {
            return <Card card={c} key={k} />
        })
    }

    render() {
        let game = this.props.game
        let cardToResolve = game.getNextCardToResolve()
        
        return (
            <div className="game-play-zone">
                <div className="play-zone-cards-played">
                    {this.renderCards()}
                </div>
                { game.playedCards.isLock() && !!cardToResolve && <ResolutionBox card={cardToResolve} /> }
                { !game.playedCards.isLock() && game.morning && <MorningCardSelection /> }
                { !game.playedCards.isLock() && !game.morning && <EveningCardSelection /> }
            </div>
        );
    }
}

export default PlayZone;