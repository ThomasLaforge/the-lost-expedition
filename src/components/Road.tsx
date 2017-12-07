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

    render() {
        return (
            <div className="road">
                {this.props.object.position}
            </div>
        );
    }
}

export default Road;