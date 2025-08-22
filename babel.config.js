
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-typescript', // ✅ TypeScript support
  ],
  plugins: [
    'react-native-worklets-core/plugin', // ✅ Vision Camera Worklets
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'react-native-reanimated/plugin', // ✅ MUST BE LAST
  ],
};

