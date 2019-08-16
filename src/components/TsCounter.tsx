import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { increase, fetch } from '@/actions/tsCounter';
import { GlobalState } from '@/model-types';

interface CounterStateProps {
  count: number;
}

interface CounterProps extends CounterStateProps {
  now: Date;
}

class TsCounter
  extends Component</* 这里到底应该怎么写，才能在组件中取到Umi，connect 和组件自身需要的Props 呢？ */CounterProps> {
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

function mapStateToProps(state: GlobalState, ownProps: CounterProps) {
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

const wrappedComponent = connect(mapStateToProps, {
  onIncrease: increase,
  next: fetch
})(TsCounter);

export default wrappedComponent;
