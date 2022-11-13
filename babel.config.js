module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".json", ".tsx", ".ts", ".ios.js", ".android.js"],
          alias: {
            "@screens": "./src/screens",
            "@stores": "./src/stores",
            "@components": "./src/components",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
