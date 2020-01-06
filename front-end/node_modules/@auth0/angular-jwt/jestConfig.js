module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/src/tsconfig.spec.json"
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "jest-environment-jsdom-thirteen",
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!@ngrx)"]
};
