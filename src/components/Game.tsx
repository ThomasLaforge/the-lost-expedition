import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

// import Road from './Road';
import PlayZone from './PlayZone';
import InfoZone from './InfoZone';

import {Game as GameModel} from '../modules/Game'

interface GameProps extends DefaultProps {
}

@inject(injector)
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
                <InfoZone />
                <PlayZone />
            </div>
        );
    }
}

export default Game;
