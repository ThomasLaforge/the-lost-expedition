import * as React from 'react';
import {observer} from 'mobx-react';

import {Road as RoadModel} from '../modules/Road'


interface RoadPartProps {
    number: number;
    playerPosition: number;
}

@observer
class RoadPart extends React.Component<RoadPartProps> {
    constructor(props: RoadPartProps) {
        super(props);
        this.state = {
        };
    }

    get isCurrentPosition(){
        return this.props.number === this.props.playerPosition
    }
    get isDiscovered(){
        return this.isCurrentPosition || this.props.number < this.props.playerPosition
    }

    renderHiddenFace(){
        return (
            <div className='road-part-hidden'>
                hidden
            </div> 
        )
    }

    renderDiscoveredFace(){
        let roadPartDiscovered = this.isDiscovered ? 'road-part-discovered' : ''
        return (
            <div className={' road-part-' + this.props.number + ' ' + roadPartDiscovered} key={'road-' + i}>
                {this.isCurrentPosition && <div className="road-part-current-position" />}
            </div>
        )
    }

    render() {
        return ( 
            <div className={'road-part road-part-' + this.props.number}>
                {this.isDiscovered ? this.renderDiscoveredFace() : this.renderHiddenFace()}
            </div>
        );
    }
}

//--------------------------------------------------------------------------------------------------------------

interface RoadProps {
    object: RoadModel;
}

@observer
class Road extends React.Component<RoadProps> {
    constructor(props: RoadProps) {
        super(props);
        this.state = {
        };
    }

    renderRoadParts(){
        let parts = [];
        for (let i = 0; i < this.props.object.length; i++) {            
            parts.push(
                <RoadPart
                    number={i}
                    playerPosition={this.props.object.position}
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