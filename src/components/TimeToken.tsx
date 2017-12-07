import * as React from 'react';

interface TimeTokenProps {
    morning: boolean;
}

class TimeToken extends React.Component<TimeTokenProps> {
    constructor(props: TimeTokenProps) {
        super(props);
        this.state = {
        };
    }

    timeToken() {
        return this.props.morning ? 'Morning' : 'Evening'
    }

    render() {
        return (
            <div className="time-token">
                {this.timeToken()}
            </div>
        );
    }
}

export default TimeToken;