import expenseReducer from './expenseDuck';
import tagReducer from './tagDuck';
import expenseTagReducer from './expenseTagDuck';
import loanReducer from './loanDuck';

export default {
  expenses: expenseReducer,
  tags: tagReducer,
  expensesTags: expenseTagReducer,
  loans: loanReducer
};