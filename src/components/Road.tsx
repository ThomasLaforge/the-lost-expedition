import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Road as RoadModel} from '../modules/Road'

interface RoadPartProps extends DefaultProps {
    index: number
}

@inject(injector)
@observer
class RoadPart extends React.Component<RoadPartProps> {
    constructor(props: RoadPartProps) {
        super(props);
        this.state = {};
    }

    get road(){ return this.props.game.road }
    get isCurrentPosition(){ return this.props.index === this.road.position }
    get isDiscovered(){ return this.isCurrentPosition || this.props.index < this.road.position }

    renderHiddenFace(){
        return (
            <div className='road-part-hidden'></div> 
        )
    }

    renderDiscoveredFace(){
        return (
            <div className={'road-part-discovered'}>
                {this.isCurrentPosition && <div className="road-part-current-position" />}
            </div>
        )
    }

    render() {
        return ( 
            <div className={'road-part road-part-' + (this.props.index + 1)}>
                {this.isDiscovered ? this.renderDiscoveredFace() : this.renderHiddenFace()}
            </div>
        );
    }
}

//--------------------------------------------------------------------------------------------------------------

interface RoadProps extends DefaultProps {
}

@inject(injector)
@observer
class Road extends React.Component<RoadProps> {
    constructor(props: RoadProps) {
        super(props);
        this.state = {
        };
    }

    get road(){ return this.props.game.road }

    renderRoadParts(){
        let parts = [];
        for (let i = 0; i < this.road.length; i++) {            
            parts.push(
                <RoadPart
                    key={i}
                    index={i}
                />
            )            
        }
        return parts
    }

    render() {
        return (
            <div className="road">
                {this.renderRoadParts()}
            </div>
        );
    }
}

export default Road;