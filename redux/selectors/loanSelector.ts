import { LoanItem } from "../../entities/loan";

export const selectLoanById = (id: number | string) => (state: any): LoanItem | undefined => {
  return state.loans.list.find((loan: LoanItem) => Number(loan.id) === Number(id));
};

export default { selectLoanById };
