function config(entry = []) {
    return [
        ...entry,
        require.resolve('storybook-i18n/preview'),
        require.resolve('./dist/esm/preset/preview'),
    ];
}

function managerEntries(entry = []) {
    return [...entry, require.resolve('storybook-i18n/manager')];
}

module.exports = {
    config,
    managerEntries,
};
