module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./components",
            "@utils": "./utils",
            "@constants": "./utils/constants",

            "@expenseDuck": "./redux/ducks/expenseDuck.js",
            "@tagDuck": "./redux/ducks/tagDuck.js",
            "@expenseTagDuck": "./redux/ducks/expenseTagDuck.js",
            "@loanDuck": "./redux/ducks/loanDuck.js",

            "@expenseSaga": "./redux/sagas/expenseSaga.js",
            "@tagSaga": "./redux/ducks/tagSaga.js",
            "@expenseTagSaga": "./redux/ducks/expenseTagSaga.js",
            "@loanSaga": "./redux/ducks/loanSaga.js",

            "@tagSelector": "./redux/selectors/tagSelector.js",
            "@loanSelector": "./redux/selectors/loanSelector.js",
          },
        },
      ],
    ],
  };
};
