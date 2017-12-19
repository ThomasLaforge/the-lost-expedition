import * as React from 'react';
import {observer} from 'mobx-react';

// import Road from './Road';
import PlayZone from './PlayZone';
import InfoZone from './InfoZone';

import {Game as GameModel} from '../modules/Game'

interface GameProps {
    game: GameModel
}

@observer
class Game extends React.Component <GameProps> {

    constructor(props: GameProps){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="game">
                <InfoZone game={this.props.game} />
                <PlayZone game={this.props.game} />
            </div>
        );
    }
}

export default Game;
