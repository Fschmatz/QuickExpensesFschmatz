module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./components",
            "@utils": "./utils",
            "@constants": "./utils/constants",

            "@expenseDuck": "./redux/ducks/expenseDuck",
            "@tagDuck": "./redux/ducks/tagDuck",
            "@expenseTagDuck": "./redux/ducks/expenseTagDuck",
            "@loanDuck": "./redux/ducks/loanDuck",

            "@expenseSaga": "./redux/sagas/expenseSaga",
            "@tagSaga": "./redux/sagas/tagSaga",
            "@expenseTagSaga": "./redux/sagas/expenseTagSaga",
            "@loanSaga": "./redux/sagas/loanSaga",

            "@tagSelector": "./redux/selectors/tagSelector",
            "@loanSelector": "./redux/selectors/loanSelector",

            "@appParameterDuck": "./redux/ducks/appParameterDuck",
            "@appParameterSaga": "./redux/sagas/appParameterSaga",
            "@appParameterSelector": "./redux/selectors/appParameterSelector",
          },
        },
      ],
    ],
  };
};
