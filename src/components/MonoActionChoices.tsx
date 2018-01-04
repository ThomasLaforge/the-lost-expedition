import * as React from 'react';
import {observer} from 'mobx-react';

import {MonoAction as MonoActionModel} from '../modules/MonoAction'
import {ResolvedActionOptions} from '../modules/TheLostExpedition'
import { ResolvedAction as ResolvedActionModel } from '../modules/ResolvedAction';

import ResolvedAction from './ResolvedAction'

interface MonoActionChoicesProps {
    monoAction: MonoActionModel;
    choices: ResolvedActionOptions[];
}

interface MonoActionChoicesState {
    selectedChoice: ResolvedActionOptions;
}

@observer
class MonoActionChoices extends React.Component<MonoActionChoicesProps> {
    
    constructor(props: MonoActionChoicesProps) {
        super(props);
        
        this.state = {
            selectedChoice: 0
        };
    }

    renderStoryOfChoice(){
        let monoAction = this.props.monoAction
        // if(monoAction)
    }
    
    renderChoices(): JSX.Element {
        return (
            <div>
                {this.props.choices.map(c => <ResolvedAction option={c} /> )}
            </div>
        )
    }

    render() {
        return (
            <div className="mono-action-choices">
                {this.renderStoryOfChoice()}
                {this.renderChoices()}
            </div>
        );
    }
}

export default MonoActionChoices;