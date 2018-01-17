import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {MonoAction as MonoActionModel} from '../modules/MonoAction'

interface MonoActionProps extends DefaultProps {
    monoAction: MonoActionModel;
}

@inject(injector)
@observer
class MonoAction extends React.Component<MonoActionProps> {
    
    constructor(props: MonoActionProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="mono-action">
                {this.props.monoAction.getDefinition()}
            </div>
        );
    }
}

export default MonoAction;