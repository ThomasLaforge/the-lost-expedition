import * as React from 'react';
import {observer} from 'mobx-react';

import {Hero as HeroModel} from '../modules/Hero'

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
        return (
            <div className="Hero">
                {this.props.hero.name}
            </div>
        );
    }
}

export default Hero;