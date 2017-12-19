import * as React from 'react';
import {observer} from 'mobx-react';

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Side} from '../modules/TheLostExpedition'

import MorningCardSelection from './MorningCardSelection';
import EveningCardSelection from './EveningCardSelection';
import ResolutionBox from './ResolutionBox';
import Card from './Card'

interface PlayZoneProps {
    game: GameModel;
}

interface PlayZoneState {
}

@observer
class PlayZone extends React.Component<PlayZoneProps, PlayZoneState> {
    
    constructor(props: PlayZoneProps) {
        super(props);
        this.state = {
        };
    }

    renderCards(){
        return this.props.game.playedCards.objects.map( (c, k) => {
            return <Card card={c} key={k} />
        })
    }

    render() {
        let game = this.props.game
        let cardToResolve = game.playedCards.getFirst()
        cardToResolve = !!cardToResolve && (cardToResolve as CardModel)
        
        return (
            <div className="game-play-zone">
                <div className="play-zone-cards-played">
                    {this.renderCards()}
                </div>
                { game.playedCards.isLock() && !!cardToResolve && <ResolutionBox card={cardToResolve} game={game} /> }
                { !game.playedCards.isLock() && game.morning && <MorningCardSelection game={game} /> }
                { !game.playedCards.isLock() && !game.morning && <EveningCardSelection game={game} /> }
            </div>
        );
    }
}

export default PlayZone;