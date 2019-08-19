import { actionCreatorFactory } from 'dva-model-creator';

const createAction = actionCreatorFactory('tsCounter');

export const reset = createAction<{ payload: number }>('reset');
export const increase = createAction<{ payload: number }>('increase');
export const fetch = createAction('fetch');
