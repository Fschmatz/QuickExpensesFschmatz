import { Tag } from "./tag";

export interface Expense {
  id: number;
  date: string;
  value: number;
  tags?: Tag[]; 
}

export const createExpense = (
  id: number,
  date: string,
  value: number,
  tags: Tag[] = [] 
): Expense => ({
  id,
  date,
  value,
  tags,
});

export default { createExpense };
