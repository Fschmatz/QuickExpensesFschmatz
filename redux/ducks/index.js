import expenseReducer from './expenseDuck';
import tagReducer from './tagDuck';
import expenseTag from './expenseTagDuck';

export default {
  expenses: expenseReducer,
  tags: tagReducer,
  expensesTags: expenseTag,
};