import * as React from 'react';
import {observer} from 'mobx-react';

import {Road as RoadModel} from '../modules/Road'

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
            let isCurrentPosition = i === this.props.object.position
            let isDiscovered = isCurrentPosition || i < this.props.object.position
            let roadPartDiscovered = isDiscovered ? 'road-part-discovered' : ''
            
            parts.push(
                <div className={'road-part road-part-' + i + ' ' + roadPartDiscovered} key={'road-' + i}>
                    {isCurrentPosition && <div className="road-part-current-position" />}
                </div>
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