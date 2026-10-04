import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './ducks';
import type { ExpenseState } from './ducks/expenseDuck';
import type { TagState } from './ducks/tagDuck';
import type { LoanState } from './ducks/loanDuck';
import type { AppParameterState } from './ducks/appParameterDuck';
import type { ExpenseTagState } from './ducks/expenseTagDuck';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers as any,
  middleware: (getDefaultMiddleware) => 
    (getDefaultMiddleware({
      serializableCheck: false,
    }) as any).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// RootState definido manualmente para garantir tipagem real (reducers manuais não inferem via RTK)
export interface RootState {
  expenses: ExpenseState;
  tags: TagState;
  expensesTags: ExpenseTagState;
  loans: LoanState;
  appParameters: AppParameterState;
}

export type AppDispatch = typeof store.dispatch;

export default store;
