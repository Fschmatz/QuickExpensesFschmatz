export class Loan {
  constructor(id, name, value, note, createdDate) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.note = note;
    this.createdDate = createdDate;
  }
}

export const createLoan = (id, name, value, note, createdDate) => ({
  id,
  name,
  value,
  note,
  createdDate,
});

export default { Loan, createLoan };
