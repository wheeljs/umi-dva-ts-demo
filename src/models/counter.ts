import { random } from 'lodash';

export default {
  state: {
    count: 0
  },
  reducers: {
    reset(state, { payload }) {
      return {
        ...state,
        count: payload
      };
    },
    increase(state, { payload = 1 }) {
      return {
        ...state,
        count: state.count + payload
      };
    }
  },
  effects: {
    *fetch(_action: never, { call, put }) {
      const next = yield call(random, 20);
      yield put({
        type: 'reset',
        payload: next
      });
    }
  }
};
