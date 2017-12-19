import * as React from 'react';
import {observer} from 'mobx-react';

import {Hero as HeroModel} from '../modules/Hero'

import Resource from './Resource'

interface HeroProps {
    hero: HeroModel
}

@observer
class Hero extends React.Component<HeroProps> {
    constructor(props: HeroProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        let hero = this.props.hero
        return (
            <div className="hero">
                <div className="hero-resource">
                    <Resource resource={hero.resource} />
                </div>
                <div className="hero-pv">PV : {hero.pvStock.stockSize}</div>
                <div className="hero-name">{hero.name}</div>
            </div>
        );
    }
}

export default Hero;