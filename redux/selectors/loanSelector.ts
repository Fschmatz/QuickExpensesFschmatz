import type { RootState } from "../store";
import { LoanItem } from "../../entities/loan";

export const selectLoanById = (id: number | string) => (state: RootState): LoanItem | undefined => {
  return state.loans.list.find((loan: LoanItem) => Number(loan.id) === Number(id));
};

export default { selectLoanById };
