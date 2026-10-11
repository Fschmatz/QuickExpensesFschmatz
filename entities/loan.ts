export interface LoanItem {
  id?: number;
  name: string;
  value: number;
  note: string | null;
  createdDate: string;
}

export class Loan {
  id?: number;
  name: string;
  value: number;
  note: string | null;
  createdDate: string;

  constructor(
    id?: number,
    name: string = "",
    value: number = 0,
    note: string | null = null,
    createdDate: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.note = note;
    this.createdDate = createdDate;
  }
}

export const createLoan = (
  id?: number,
  name: string = "",
  value: number = 0,
  note: string | null = null,
  createdDate: string = ""
): LoanItem => ({
  id,
  name,
  value,
  note,
  createdDate,
});

export default { Loan, createLoan };
