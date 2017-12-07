import * as React from 'react';
import {Hero as HeroModel} from '../modules/Hero'

interface HeroProps {
    hero: HeroModel
}

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