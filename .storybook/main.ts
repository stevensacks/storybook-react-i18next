import {defineMain} from '@storybook/react-vite/node';

const config = defineMain({
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        import.meta.resolve('./local-preset.js'),
    ],
    framework: '@storybook/react-vite',
});

export default config;
