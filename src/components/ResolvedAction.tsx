import * as React from 'react';
import {observer} from 'mobx-react';

import {MonoAction as MonoActionModel} from '../modules/MonoAction'
import {ResolvedActionOptions} from '../modules/TheLostExpedition'
import { ResolvedAction as ResolvedActionModel } from '../modules/ResolvedAction';

import Card from './Card'
import Hero from './Hero'

interface ResolvedActionProps {
    option: ResolvedActionOptions
}

interface ResolvedActionState {
}

@observer
class ResolvedAction extends React.Component<ResolvedActionProps> {
    
    constructor(props: ResolvedActionProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log('option', this.props.option)
        return (
            <div className="resolved-actions-choice">
                { this.props.option.cardsToSwitch && 
                    <div className='choice-cards-to-switch'>
                        <Card card={this.props.option.cardsToSwitch[0]} />
                        <Card card={this.props.option.cardsToSwitch[0]} />
                    </div>
                }
                { this.props.option.hero && 
                    <div className='choice-hero'>
                        <Hero hero={this.props.option.hero} /> 
                    </div>
                }
                { this.props.option.keptCard && 
                    <div className='choice-hero'>
                        <Card card={this.props.option.keptCard} /> 
                    </div>
                }

            </div>
        );
    }
}

export default ResolvedAction;