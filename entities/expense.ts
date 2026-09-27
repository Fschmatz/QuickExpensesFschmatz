import { TagItem } from "./tag";

export interface ExpenseItem {
  id?: number;
  createdDate: string;
  value: number;
  tags: TagItem[];
  name: string | null;
}

export class Expense {
  id?: number;
  createdDate: string;
  value: number;
  tags: TagItem[];
  name: string | null;

  constructor(
    id?: number,
    createdDate: string = "",
    value: number = 0,
    tags: TagItem[] = [],
    name: string | null = null
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.value = value;
    this.tags = tags;
    this.name = name;
  }
}

export const createExpense = (
  id?: number,
  createdDate: string = "",
  value: number = 0,
  tags: TagItem[] = [],
  name: string | null = null
): ExpenseItem => ({
  id,
  createdDate,
  value,
  tags,
  name,
});

export default { Expense, createExpense };
