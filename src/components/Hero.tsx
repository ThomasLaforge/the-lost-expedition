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
        };
    }

    render() {
        let hero = this.props.hero
        return (
            <div className={'hero hero-' + this.props.hero.id + ' hero-' + (this.props.hero.isAlive() ? 'alive' : 'dead') } />
        );
    }
}

export default Hero;