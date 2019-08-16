import React, { Component } from 'react';
import { connect, DispatchProp } from 'dva';
import { Button } from 'antd';

interface CounterNeedsProps {
  now: Date;
}

interface CounterProps extends CounterNeedsProps, DispatchProp {
  count: number;
}

class Counter extends Component<CounterNeedsProps> {
  constructor(props: CounterProps) {
    super(props);
  }

  increase = () => {
    this.props.dispatch({
      type: 'counter/increase',
      payload: 1
    });
  }

  decrease = () => {
    this.props.dispatch({
      type: 'counter/increase',
      payload: -1
    });
  }

  random = () => {
    this.props.dispatch({
      type: 'counter/fetch'
    });
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        <Button onClick={this.decrease}>-</Button>
        {count}
        <Button onClick={this.increase}>+</Button>
        <Button onClick={this.random}>Random</Button>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: CounterProps) {
  let offsetedDate;
  if (ownProps.now) {
    const { now } = ownProps;
    offsetedDate = now.setDate(now.getDate() + 1);
  }
  return {
    count: state.counter.count,
    date: offsetedDate
  };
}

export default connect(mapStateToProps)(Counter);
