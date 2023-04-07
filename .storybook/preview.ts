import type {Preview} from '@storybook/react';
// @ts-ignore
import i18n from './i18next';

const preview: Preview = {
    globals: {
        locale: 'en',
        locales: {
            en: {title: 'English', left: '🇺🇸', right: 'EN'},
            fr: {title: 'French', left: '🇫🇷', right: 'FR'},
            ja: {title: '日本語', left: '🇯🇵', right: 'JA'},
        },
    },
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        backgrounds: {
            default: 'light',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        i18n,
    },
};

export default preview;
