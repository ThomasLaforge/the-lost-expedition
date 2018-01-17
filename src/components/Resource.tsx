import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Resource as ResourceModel} from '../modules/Resource'

interface ResourceProps extends DefaultProps {
    resource: ResourceModel;
}

@inject(injector)
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