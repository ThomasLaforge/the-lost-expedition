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
            <div className="Monoaction">
                MonoAction: 
                {this.props.monoAction.drop ? 'drop' : 'not drop'},
                {this.props.monoAction.resource}

            </div>
        );
    }
}

export default MonoAction;