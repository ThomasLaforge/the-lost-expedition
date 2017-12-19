import * as React from 'react';
import {observer} from 'mobx-react';

import {Resource as ResourceModel} from '../modules/Resource'

interface ResourceProps {
    resource: ResourceModel;
}

@observer
class Resource extends React.Component<ResourceProps> {
    constructor(props: ResourceProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="resource">
                Resource : {this.props.resource.type}
            </div>
        );
    }
}

export default Resource;