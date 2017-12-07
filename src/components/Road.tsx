import * as React from 'react';
import {Road as RoadModel} from '../modules/Road'

interface RoadProps {
    object: RoadModel;
}

class Road extends React.Component<RoadProps> {
    constructor(props: RoadProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="road">
                {this.props.object.position}
            </div>
        );
    }
}

export default Road;