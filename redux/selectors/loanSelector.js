export const selectLoanById = (id) => (state) => {
  return state.loans.list.find((loan) => Number(loan.id) === Number(id));
};

export default { selectLoanById };
