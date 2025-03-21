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

            "@expenseSaga": "./redux/sagas/expenseSaga.js",
            "@tagSaga": "./redux/ducks/tagSaga.js",
            "@expenseTagSaga": "./redux/ducks/expenseTagSaga.js",

            "@tagSelector": "./redux/selectors/tagSelector.js",
          },
        },
      ],
    ],
  };
};
