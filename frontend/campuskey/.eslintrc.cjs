module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ["react-app", "react-app/jest"],
  ignorePatterns: ["dist", "node_modules"],
};

