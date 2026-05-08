import expenseReducer from './expenseDuck';
import tagReducer from './tagDuck';
import expenseTagReducer from './expenseTagDuck';
import loanReducer from './loanDuck';
import appParameterReducer from './appParameterDuck';

export default {
  expenses: expenseReducer,
  tags: tagReducer,
  expensesTags: expenseTagReducer,
  loans: loanReducer,
  appParameters: appParameterReducer
};