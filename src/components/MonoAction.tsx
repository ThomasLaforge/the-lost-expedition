import * as React from 'react';
import {observer} from 'mobx-react';

import {MonoAction as MonoActionModel} from '../modules/MonoAction'

interface MonoActionProps {
    monoAction: MonoActionModel;
}

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