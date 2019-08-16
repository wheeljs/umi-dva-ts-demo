import { random } from 'lodash';
import { DvaModelBuilder } from 'dva-model-creator';
import { reset, increase, fetch } from '@/actions/tsCounter';
import { TsCounter } from '@/model-types/';

const initState: TsCounter = {
  count: 0
};

const builder = new DvaModelBuilder(initState, 'tsCounter')
  .case(reset, (state, { payload }) => ({
    ...state,
    count: payload
  }))
  .case(increase, (state, { payload }) => ({
    ...state,
    count: state.count + payload
  }))
  .takeEvery(fetch, function*(_payload, { call, put }) {
    const next = yield call(random, -20, 20);
    yield put(reset({ payload: next }));
  });

export default builder.build();
