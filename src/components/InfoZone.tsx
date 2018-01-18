import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Side} from '../modules/TheLostExpedition'

import TimeToken from './TimeToken';
import Deck from './Deck';
import Heroes from './Heroes';
import Road from './Road';
import Stocks from './Stocks';
import KeptCards from './KeptCards';
import PlayerActionBox from './PlayerActionBox';

interface InfoZoneProps extends DefaultProps {
}

interface InfoZoneState {
}

@inject(injector)
@observer
class InfoZone extends React.Component<InfoZoneProps, InfoZoneState> {
    
    constructor(props: InfoZoneProps) {
        super(props);
        this.state = {
        };
    }


    render() {

        return (
            <div className="game-info">
                <Road />
                {/* <Deck /> */}
                <TimeToken />
                <Stocks />
                <Heroes />
                <KeptCards />
            </div>
        );
    }
}

export default InfoZone;