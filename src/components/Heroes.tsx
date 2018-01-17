import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Hero as HeroModel} from '../modules/Hero'
import Hero from './Hero'

interface HeroesProps extends DefaultProps {
    heroes: HeroModel[];
}

@inject(injector)
@observer
class Heroes extends React.Component<HeroesProps> {
    
    constructor(props: HeroesProps) {
        super(props);
        this.state = {
        };
    }

    renderHeroes(){
        return this.props.heroes.map( (h, k) => {
            return <Hero key={k} hero={h} />
        })
    }

    render() {
        return (
            <div className="heroes">
                {this.renderHeroes()}
            </div>
        );
    }
}

export default Heroes;