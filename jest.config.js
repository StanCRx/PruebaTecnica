module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|redux|react-redux|expo|expo-modules-core)/)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
