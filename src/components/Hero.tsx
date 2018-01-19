import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Hero as HeroModel} from '../modules/Hero'

import Resource from './Resource'

interface HeroProps extends DefaultProps {
    hero: HeroModel
}

@inject(injector)
@observer
class Hero extends React.Component<HeroProps> {
    constructor(props: HeroProps) {
        super(props);
        this.state = {
            bool: true
        };
    }

    renderPVs(){
        let pvDivs = []
        for (let i = 0; i < this.props.hero.pvStock.stockSize; i++) {
            pvDivs.push(<div className='hero-health-pv' key={i} />)            
        }
        return pvDivs
    }

    render() {
        let hero = this.props.hero
        return (
            <div className='hero'>
                <div className={'hero-' + hero.id + ' hero-' + (hero.isAlive() ? 'alive' : 'dead') } />
                {hero.isAlive() && 
                    <div className={'hero-health'}>
                        {this.renderPVs()}
                    </div>
                }
            </div>
        );
    }
}

export default Hero;