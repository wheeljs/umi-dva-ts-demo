import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { increase, fetch } from '@/actions/tsCounter';
import { GlobalState } from '@/model-types';

interface CounterNeedsProps {
  now: Date;
}

function mapStateToProps(state: GlobalState, ownProps: CounterNeedsProps) {
  let offsetedDate;
  if (ownProps.now) {
    const { now } = ownProps;
    offsetedDate = now.setDate(now.getDate() + 1);
  }
  return {
    count: state.tsCounter.count,
    date: offsetedDate
  };
}

const dispatchMapping = {
  onIncrease: increase,
  next: fetch
};

type CounterProps = ReturnType<typeof mapStateToProps> &
  typeof dispatchMapping & CounterNeedsProps;

class TsCounter
  extends Component<CounterProps> {
  constructor(props: CounterProps) {
    super(props);
  }

  increase = () => {
    this.props.onIncrease({ payload: 1 });
  }

  decrease = () => {
    this.props.onIncrease({ payload: -1 });
  }

  random = () => {
    this.props.next();
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

const wrappedComponent = connect(mapStateToProps, dispatchMapping)(TsCounter);

export default wrappedComponent;
