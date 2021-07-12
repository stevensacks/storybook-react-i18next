function config(entry = []) {
  return [
    ...entry,
    require.resolve('storybook-i18n/preview'),
    require.resolve('./dist/esm/preset/preview'),
  ];
}

module.exports = {
  config,
};
